import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { components } from 'types/schema';
import { SwayamApiResponse } from 'types/SwayamApiResponse';
import { selectItemMapper, flnCatalogGenerator, confirmItemMapper,generateOrderFromProvider } from 'utils/generator';
import * as crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';



// getting course data
import * as fs from 'fs';
import { HasuraService } from './services/hasura/hasura.service';
import { AuthService } from './auth/auth.service';
import { Console } from 'console';
import { S3Service } from './services/s3/s3.service';
const file = fs.readFileSync('./course.json', 'utf8');
const courseData = JSON.parse(file);

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService, private readonly hasuraService: HasuraService, private readonly authService: AuthService, private readonly s3Service: S3Service) { }
  private base_url = process.env.BASE_URL;
  private dbName = process.env.DBNAME;



  getHello(): string {
    return 'floodcase service is running!!';
  }

  async getCoursesFromFlnV3(body: {
    context: components['schemas']['Context'];
    message: { intent: components['schemas']['Intent'] };
  }) {

    console.log("body 26", JSON.stringify(body))

    const intent: any = body.message.intent;
    console.log('intent: ', intent);

    // destructuring the intent
    const provider = intent?.provider?.descriptor?.name;
    const query = intent?.item?.descriptor?.name;
    const tagGroup = intent?.item?.tags;
    console.log('tag group: ', tagGroup);
    console.log('tag group [0]: ', tagGroup[0]);

    const flattenedTags: any = {};
    if (tagGroup) {
      (tagGroup[0].list as any[])?.forEach((tag) => {
        flattenedTags[tag.name] = tag.value;
      });
    }
    console.log('flattened tags: ', flattenedTags);
    const domain = flattenedTags?.domain !== '' ? flattenedTags?.domain
      : null;
    const theme = flattenedTags?.theme !== '' ? flattenedTags?.theme
      : null;
    const goal = flattenedTags?.goal !== '' ? flattenedTags?.goal
      : null;
    const competency = flattenedTags?.competency !== '' ? flattenedTags?.competency
      : null;
    const language = flattenedTags?.language !== '' ? flattenedTags?.language
      : null;
    const contentType = flattenedTags?.contentType !== '' ? flattenedTags?.contentType
      : null;

    try {

      const resp = await lastValueFrom(
        this.httpService
          .get('https://onest-strapi.tekdinext.com/fln-contents', {
            //  .get('http://localhost:1337/api/fln-contents', {
            params: {
              language: language,
              domain: domain,
              themes: theme,
              goal: goal,
              competency: competency,
              contentType: contentType
            }
          })
          .pipe(map((item) => item.data)),
      );
      console.log("resp", resp)
      const flnResponse: any = resp;
      const catalog = flnCatalogGenerator(flnResponse, query);

      const courseData: any = {
        context: body.context,
        message: {
          catalog: catalog,
        },
      };
      console.log("courseData", courseData)
      console.log("courseData 86", JSON.stringify(courseData))
      return courseData;
    } catch (err) {
      console.log('err: ', err);
      throw new InternalServerErrorException(err);
    }
  }

  async getContent(body: {
    context: components['schemas']['Context'];
    message: { intent: components['schemas']['Intent'] };
  }) {
    console.log("body 98", JSON.stringify(body))
    const intent: any = body.message.intent;
    console.log('intent: ', intent);

    // destructuring the intent
    const provider = intent?.provider?.descriptor?.name;
    const query = intent?.item?.descriptor?.name;
    const tagGroup = intent?.tags;
    const stops = intent?.fulfillment?.stops;
    console.log("fulfillment > stops >>> ",stops)
    console.log('query: ', query);
    console.log('tag group: ', tagGroup);

    // const flattenedTags: any = {};
    // if (tagGroup) {
    //   (tagGroup[0].list as any[])?.forEach((tag) => {
    //     flattenedTags[tag.name] = tag.value;
    //   });
    // }
    // console.log('flattened tags: ', flattenedTags);
    // const domain = flattenedTags?.domain !== '' ? flattenedTags?.domain : null;
    // const theme = flattenedTags?.theme !== '' ? flattenedTags?.theme : null;
    // const goal = flattenedTags?.goal !== '' ? flattenedTags?.goal : null;
    // const competency = flattenedTags?.competency !== '' ? flattenedTags?.competency : null;
    // const language = flattenedTags?.language !== '' ? flattenedTags?.language : null;
    // const contentType = flattenedTags?.contentType !== '' ? flattenedTags?.contentType : null;

    // let obj = {}
    // if (flattenedTags.domain) {
    //   obj['domain'] = flattenedTags.domain
    // }
    // if (flattenedTags?.theme) {
    //   obj['theme'] = flattenedTags?.theme
    // }
    // if (flattenedTags?.goal) {
    //   obj['goal'] = flattenedTags?.goal
    // }
    // if (flattenedTags?.competency) {
    //   obj['competency'] = flattenedTags?.competency
    // }
    // if (flattenedTags?.language) {
    //   obj['language'] = flattenedTags?.language
    // }
    // if (flattenedTags?.contentType) {
    //   obj['contentType'] = flattenedTags?.contentType
    // }
    // console.log("filter obj", obj)
    console.log("217", body.context.domain)
    try {
      //const resp = await this.hasuraService.findContent(query)
      const filter = {locations:[],name:query,operation:""};
      if(stops && stops.length){
        filter.locations = stops.map((stop:any)=>{
          return stop?.location?.city?.name;
  
        }).filter(function (el:any) {
          return el != null;
        });
      }
      if(tagGroup && tagGroup.length){
        filter.operation = tagGroup.map((tag:any)=>{
          return tag?.descriptor?.name == "operation"?(tag?.value || ""):"";
        })[0];
      }
      const resp = await this.hasuraService.findClimateContent(filter)
      const flnResponse: any = resp.data[`${this.dbName}`];
      for (let provider of flnResponse) {
        provider.image_url = await this.hasuraService.getImageUrl(provider.image_key);
      }
      const catalog = flnCatalogGenerator(flnResponse, query);
      body.context.action = 'on_search'
      const courseData: any = {
        context: body.context,
        message: {
          catalog: catalog,
        },
      };
      console.log("courseData", courseData)
      console.log("courseData 158", JSON.stringify(courseData))
      return courseData;

    } catch (err) {
      console.log('err: ', err);
      throw new InternalServerErrorException(err);
    }
  }

  async handleSelect(selectDto: any) {
    console.log("select api calling", selectDto);
    console.log("select api calling > message ", selectDto.message)
    console.log("select api calling > message > order ", selectDto.message.order)
    // fine tune the order here
    selectDto.context.action = 'on_select';
    selectDto.context.ttl =  "PT10M";
    selectDto.context.location = { country: { code: "" }, city: { name: "" } }

    // const providerId = selectDto.message.order.provider.id;
    const itemId = selectDto.message.order.items[0].id
    const item = await this.hasuraService.findClimateContentById(itemId);
 
    selectDto.message.order = generateOrderFromProvider(item[0]);

    const resp = selectDto;
    return resp;
  }



  async handleInit(selectDto: any) {
    // fine tune the order here
    const itemId = selectDto.message.order.items[0].id;

    // const courseData = await this.hasuraService.getFlnContentById(itemId)
    // console.log("contentData", courseData.data.fln_content)

    //delete courseData.data.fln_content[0].url
    const item = await this.hasuraService.findClimateContentById(itemId);

    //const order: any = selectItemMapper(courseData.data.fln_content[0]);
    // order['fulfillments'] = selectDto.message.order.fulfillments;
    selectDto.message.order = generateOrderFromProvider(item[0]);
    selectDto.context.action = 'on_init';
    const resp = selectDto;
    console.log("resp", resp)
    return resp;
  }

  async handleConfirm1(confirmDto: any) {


    const itemId = confirmDto.message.order.items[0].id;



    const email = confirmDto.message.order.fulfillments[0].customer.contact.email;
    const name = confirmDto.message.order.fulfillments[0].customer.person.name;
    const age = confirmDto.message.order.fulfillments[0].customer.person.age;
    const gender = confirmDto.message.order.fulfillments[0].customer.person.gender;
    const phone = confirmDto.message.order.fulfillments[0].customer.contact.phone;
    const randomString = crypto.randomBytes(3).toString('hex').toUpperCase();



    const order_id = "KAHAANI" + `${randomString}`;


    const seeker = await this.hasuraService.FindUserByEmail(email)
    console.log(seeker)
    const id = seeker.data.Seeker[0]?.id;



    if (id === undefined) {
      let seekerDto =
      {

        name: name,
        email: email,
        role: "seeker",
        age: age,
        gender: gender,
        phone: phone,
        order_id: order_id
      }


      const createSeeker = await this.authService.createUser(seekerDto)

    }


    const presentOrder = await this.hasuraService.IsOrderExist(itemId, id)

    if (!presentOrder) {
      const Order = await this.hasuraService.GenerateOrderId(itemId, id, order_id)

    }

    const OrderDetails = await this.hasuraService.GetOrderId(itemId, id)
    const orderId = OrderDetails.data.Orders[0].order_id

    const courseData = await this.hasuraService.getFlnContentByOrderId(orderId)
    const order: any = confirmItemMapper(courseData.data.Orders[0]);

    // order['id'] = "ICAR_"+`${randomString}`;
    // order['fulfillments'] = confirmDto.message.order.fulfillments;
    // order['state'] = 'COMPLETE';
    // order['type'] = 'DEFAULT';
    // order['created_at'] = new Date(Date.now());
    // order['updated_at'] = new Date(Date.now());
    confirmDto.message.order = order;
    confirmDto.context.action = 'on_confirm'
    console.log("confirmDto", confirmDto)
    return confirmDto
    // storing draft order in database
    const createOrderGQL = `mutation insertDraftOrder($order: dsep_orders_insert_input!) {
  insert_dsep_orders_one (
    object: $order
  ) {
    order_id
  }
}`;

    await lastValueFrom(
      this.httpService
        .post(
          process.env.HASURA_URI,
          {
            query: createOrderGQL,
            variables: {
              order: {
                order_id: confirmDto.message.order.id,
                user_id:
                  confirmDto.message?.order?.fulfillments[0]?.customer?.person
                    ?.name,
                created_at: new Date(Date.now()),
                updated_at: new Date(Date.now()),
                status: confirmDto.message.order.state,
                order_details: confirmDto.message.order,
              },
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'x-hasura-admin-secret': process.env.SECRET,
            },
          },
        )
        .pipe(map((item) => item.data)),
    );

    confirmDto.message.order = order;

    // update order as confirmed in database
    const updateOrderGQL = `mutation updateDSEPOrder($order_id: String, $changes: dsep_orders_set_input) {
      update_dsep_orders (
        where: {order_id: {_eq: $order_id}},
        _set: $changes
      ) {
        affected_rows
        returning {
          order_id
          status
          order_details
        }
      }
    }`;

    try {
      const res = await lastValueFrom(
        this.httpService
          .post(
            process.env.HASURA_URI,
            {
              query: updateOrderGQL,
              variables: {
                order_id: order.id,
                changes: {
                  order_details: order,
                  status: order.state,
                },
              },
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': process.env.SECRET,
              },
            },
          )
          .pipe(map((item) => item.data)),
      );
      console.log('res in test api update: ', res.data);

      confirmDto.message.order = order;
      confirmDto.context.action = 'on_confirm';
      console.log('action: ', confirmDto.context.action);
      return confirmDto;
    } catch (err) {
      console.log('err: ', err);
      throw new InternalServerErrorException(err);
    }
  }

  async handleConfirm(confirmDto: any) {


    const itemId = confirmDto.message.order.items[0].id;

    const item = await this.hasuraService.findClimateContentById(itemId);

    //const order: any = selectItemMapper(courseData.data.fln_content[0]);
    // order['fulfillments'] = selectDto.message.order.fulfillments;
    const order = generateOrderFromProvider(item[0]);

    console.log("confirmDto.message.order.items[0].tags", confirmDto.message.order.items[0].tags)

    order.items[0].tags = confirmDto.message.order.items[0].tags;

    order['fulfillments'] = confirmDto.message.order.fulfillments.map((iFulfillment:any)=>{
      const fulfillment:components['schemas']['Fulfillment'] = {
        "state": {
          "descriptor" : {
            "code" : "ORDER CONFIRMED",
            "name" : "Your Order is confirmed"
          },
          "updated_at" : new Date(Date.now()).toISOString()
        },
        "stops" : [
          {
            "type" : "CLOUD",
            "instructions": {
              "short_desc" : "Data set will be available soon"
            }
          }
        ],
        "tags": [
          {
            "descriptor": {
              "name": "Terms of order"
            },
            "list": [
              {
                "value": "https://www.analytics.sky/data/termsandcondition"
              }
            ]
          }
        ]
      }

      return {...iFulfillment,...fulfillment}

    })

    const randomString = crypto.randomBytes(4).toString('hex').toUpperCase();



    const order_id = "CLI" + `${randomString}`;

    order['id'] = order_id;

    confirmDto.message.order = order;
    confirmDto.context.action = 'on_confirm'
    console.log("confirmDto", confirmDto)
    return confirmDto
    
  }


  async handleRating(ratingDto: any) {

    const itemId = ratingDto.message.ratings[0].id;
    const rating = ratingDto.message.ratings[0].value;
    const feedback = ratingDto.message.ratings[0].feedback;

    const courseData = await this.hasuraService.rateFlnContentById(itemId, rating, feedback)
    const id = courseData.data.insert_Ratings.returning[0].id

    ratingDto.context.action = 'on_rating';
    ratingDto.message = {
      "feedback_form": {
        "form": {
          "url": `${this.base_url}/feedback/${id}`,
          "mime_type": "text/html"
        },
        "required": true
      }
    }
    const resp = ratingDto;
    return resp;

  }

  async handleSubmit(description, id) {
    try {
      const courseData = await this.hasuraService.SubmitFeedback(description, id)
      return { message: "feedback submitted Successfully" }
    }
    catch (error) {
      return (error)

    }





  }

  // Function to check if a string is a valid URL
  isValidUrl(str: string) {
    try {
      new URL(str);
      return true;
    } catch (error) {
      return false;
    }
  };

}
