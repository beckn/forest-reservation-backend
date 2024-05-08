"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const generator_1 = require("../utils/generator");
const crypto = require("crypto");
const fs = require("fs");
const hasura_service_1 = require("./services/hasura/hasura.service");
const auth_service_1 = require("./auth/auth.service");
const s3_service_1 = require("./services/s3/s3.service");
const file = fs.readFileSync('./course.json', 'utf8');
const courseData = JSON.parse(file);
let AppService = class AppService {
    constructor(httpService, hasuraService, authService, s3Service) {
        this.httpService = httpService;
        this.hasuraService = hasuraService;
        this.authService = authService;
        this.s3Service = s3Service;
        this.base_url = process.env.BASE_URL;
        this.dbName = process.env.DBNAME;
    }
    getHello() {
        return 'floodcase service is running!!';
    }
    async getCoursesFromFlnV3(body) {
        var _a, _b, _c, _d, _e, _f;
        console.log("body 26", JSON.stringify(body));
        const intent = body.message.intent;
        console.log('intent: ', intent);
        const provider = (_b = (_a = intent === null || intent === void 0 ? void 0 : intent.provider) === null || _a === void 0 ? void 0 : _a.descriptor) === null || _b === void 0 ? void 0 : _b.name;
        const query = (_d = (_c = intent === null || intent === void 0 ? void 0 : intent.item) === null || _c === void 0 ? void 0 : _c.descriptor) === null || _d === void 0 ? void 0 : _d.name;
        const tagGroup = (_e = intent === null || intent === void 0 ? void 0 : intent.item) === null || _e === void 0 ? void 0 : _e.tags;
        console.log('tag group: ', tagGroup);
        console.log('tag group [0]: ', tagGroup[0]);
        const flattenedTags = {};
        if (tagGroup) {
            (_f = tagGroup[0].list) === null || _f === void 0 ? void 0 : _f.forEach((tag) => {
                flattenedTags[tag.name] = tag.value;
            });
        }
        console.log('flattened tags: ', flattenedTags);
        const domain = (flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.domain) !== '' ? flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.domain
            : null;
        const theme = (flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.theme) !== '' ? flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.theme
            : null;
        const goal = (flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.goal) !== '' ? flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.goal
            : null;
        const competency = (flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.competency) !== '' ? flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.competency
            : null;
        const language = (flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.language) !== '' ? flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.language
            : null;
        const contentType = (flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.contentType) !== '' ? flattenedTags === null || flattenedTags === void 0 ? void 0 : flattenedTags.contentType
            : null;
        try {
            const resp = await (0, rxjs_1.lastValueFrom)(this.httpService
                .get('https://onest-strapi.tekdinext.com/fln-contents', {
                params: {
                    language: language,
                    domain: domain,
                    themes: theme,
                    goal: goal,
                    competency: competency,
                    contentType: contentType
                }
            })
                .pipe((0, rxjs_1.map)((item) => item.data)));
            console.log("resp", resp);
            const flnResponse = resp;
            const catalog = (0, generator_1.flnCatalogGenerator)(flnResponse, query);
            const courseData = {
                context: body.context,
                message: {
                    catalog: catalog,
                },
            };
            console.log("courseData", courseData);
            console.log("courseData 86", JSON.stringify(courseData));
            return courseData;
        }
        catch (err) {
            console.log('err: ', err);
            throw new common_1.InternalServerErrorException(err);
        }
    }
    async getContent(body) {
        var _a, _b, _c, _d, _e;
        console.log("body 98", JSON.stringify(body));
        const intent = body.message.intent;
        console.log('intent: ', intent);
        const provider = (_b = (_a = intent === null || intent === void 0 ? void 0 : intent.provider) === null || _a === void 0 ? void 0 : _a.descriptor) === null || _b === void 0 ? void 0 : _b.name;
        const query = (_d = (_c = intent === null || intent === void 0 ? void 0 : intent.item) === null || _c === void 0 ? void 0 : _c.descriptor) === null || _d === void 0 ? void 0 : _d.name;
        const tagGroup = intent === null || intent === void 0 ? void 0 : intent.tags;
        const stops = (_e = intent === null || intent === void 0 ? void 0 : intent.fulfillment) === null || _e === void 0 ? void 0 : _e.stops;
        console.log("fulfillment > stops >>> ", stops);
        console.log('query: ', query);
        console.log('tag group: ', tagGroup);
        console.log("217", body.context.domain);
        try {
            const filter = { locations: [], name: query, operation: "" };
            if (stops && stops.length) {
                filter.locations = stops.map((stop) => {
                    var _a, _b;
                    return (_b = (_a = stop === null || stop === void 0 ? void 0 : stop.location) === null || _a === void 0 ? void 0 : _a.city) === null || _b === void 0 ? void 0 : _b.name;
                }).filter(function (el) {
                    return el != null;
                });
            }
            if (tagGroup && tagGroup.length) {
                filter.operation = tagGroup.map((tag) => {
                    var _a;
                    return ((_a = tag === null || tag === void 0 ? void 0 : tag.descriptor) === null || _a === void 0 ? void 0 : _a.name) == "operation" ? ((tag === null || tag === void 0 ? void 0 : tag.value) || "") : "";
                })[0];
            }
            const resp = await this.hasuraService.findClimateContent(filter);
            const flnResponse = resp.data[`${this.dbName}`];
            for (let provider of flnResponse) {
                provider.image_url = await this.hasuraService.getImageUrl(provider.image_key);
            }
            const catalog = (0, generator_1.flnCatalogGenerator)(flnResponse, query);
            body.context.action = 'on_search';
            const courseData = {
                context: body.context,
                message: {
                    catalog: catalog,
                },
            };
            console.log("courseData", courseData);
            console.log("courseData 158", JSON.stringify(courseData));
            return courseData;
        }
        catch (err) {
            console.log('err: ', err);
            throw new common_1.InternalServerErrorException(err);
        }
    }
    async handleSelect(selectDto) {
        console.log("select api calling", selectDto);
        console.log("select api calling > message ", selectDto.message);
        console.log("select api calling > message > order ", selectDto.message.order);
        selectDto.context.action = 'on_select';
        selectDto.context.ttl = "PT10M";
        selectDto.context.location = { country: { code: "" }, city: { name: "" } };
        const itemId = selectDto.message.order.items[0].id;
        const item = await this.hasuraService.findClimateContentById(itemId);
        selectDto.message.order = (0, generator_1.generateOrderFromProvider)(item[0]);
        const resp = selectDto;
        return resp;
    }
    async handleInit(selectDto) {
        const itemId = selectDto.message.order.items[0].id;
        const item = await this.hasuraService.findClimateContentById(itemId);
        selectDto.message.order = (0, generator_1.generateOrderFromProvider)(item[0]);
        selectDto.context.action = 'on_init';
        const resp = selectDto;
        console.log("resp", resp);
        return resp;
    }
    async handleConfirm1(confirmDto) {
        var _a, _b, _c, _d, _e, _f;
        const itemId = confirmDto.message.order.items[0].id;
        const email = confirmDto.message.order.fulfillments[0].customer.contact.email;
        const name = confirmDto.message.order.fulfillments[0].customer.person.name;
        const age = confirmDto.message.order.fulfillments[0].customer.person.age;
        const gender = confirmDto.message.order.fulfillments[0].customer.person.gender;
        const phone = confirmDto.message.order.fulfillments[0].customer.contact.phone;
        const randomString = crypto.randomBytes(3).toString('hex').toUpperCase();
        const order_id = "KAHAANI" + `${randomString}`;
        const seeker = await this.hasuraService.FindUserByEmail(email);
        console.log(seeker);
        const id = (_a = seeker.data.Seeker[0]) === null || _a === void 0 ? void 0 : _a.id;
        if (id === undefined) {
            let seekerDto = {
                name: name,
                email: email,
                role: "seeker",
                age: age,
                gender: gender,
                phone: phone,
                order_id: order_id
            };
            const createSeeker = await this.authService.createUser(seekerDto);
        }
        const presentOrder = await this.hasuraService.IsOrderExist(itemId, id);
        if (!presentOrder) {
            const Order = await this.hasuraService.GenerateOrderId(itemId, id, order_id);
        }
        const OrderDetails = await this.hasuraService.GetOrderId(itemId, id);
        const orderId = OrderDetails.data.Orders[0].order_id;
        const courseData = await this.hasuraService.getFlnContentByOrderId(orderId);
        const order = (0, generator_1.confirmItemMapper)(courseData.data.Orders[0]);
        confirmDto.message.order = order;
        confirmDto.context.action = 'on_confirm';
        console.log("confirmDto", confirmDto);
        return confirmDto;
        const createOrderGQL = `mutation insertDraftOrder($order: dsep_orders_insert_input!) {
  insert_dsep_orders_one (
    object: $order
  ) {
    order_id
  }
}`;
        await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(process.env.HASURA_URI, {
            query: createOrderGQL,
            variables: {
                order: {
                    order_id: confirmDto.message.order.id,
                    user_id: (_f = (_e = (_d = (_c = (_b = confirmDto.message) === null || _b === void 0 ? void 0 : _b.order) === null || _c === void 0 ? void 0 : _c.fulfillments[0]) === null || _d === void 0 ? void 0 : _d.customer) === null || _e === void 0 ? void 0 : _e.person) === null || _f === void 0 ? void 0 : _f.name,
                    created_at: new Date(Date.now()),
                    updated_at: new Date(Date.now()),
                    status: confirmDto.message.order.state,
                    order_details: confirmDto.message.order,
                },
            },
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-hasura-admin-secret': process.env.SECRET,
            },
        })
            .pipe((0, rxjs_1.map)((item) => item.data)));
        confirmDto.message.order = order;
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
            const res = await (0, rxjs_1.lastValueFrom)(this.httpService
                .post(process.env.HASURA_URI, {
                query: updateOrderGQL,
                variables: {
                    order_id: order.id,
                    changes: {
                        order_details: order,
                        status: order.state,
                    },
                },
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': process.env.SECRET,
                },
            })
                .pipe((0, rxjs_1.map)((item) => item.data)));
            console.log('res in test api update: ', res.data);
            confirmDto.message.order = order;
            confirmDto.context.action = 'on_confirm';
            console.log('action: ', confirmDto.context.action);
            return confirmDto;
        }
        catch (err) {
            console.log('err: ', err);
            throw new common_1.InternalServerErrorException(err);
        }
    }
    async handleConfirm(confirmDto) {
        const itemId = confirmDto.message.order.items[0].id;
        const item = await this.hasuraService.findClimateContentById(itemId);
        const order = (0, generator_1.generateOrderFromProvider)(item[0]);
        console.log("confirmDto.message.order.items[0].tags", confirmDto.message.order.items[0].tags);
        order.items[0].tags = confirmDto.message.order.items[0].tags;
        order['fulfillments'] = confirmDto.message.order.fulfillments.map((iFulfillment) => {
            const fulfillment = {
                "state": {
                    "descriptor": {
                        "code": "ORDER CONFIRMED",
                        "name": "Your Order is confirmed"
                    },
                    "updated_at": new Date(Date.now()).toISOString()
                },
                "stops": [
                    {
                        "type": "CLOUD",
                        "instructions": {
                            "short_desc": "Data set will be available soon"
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
            };
            return Object.assign(Object.assign({}, iFulfillment), fulfillment);
        });
        const randomString = crypto.randomBytes(4).toString('hex').toUpperCase();
        const order_id = "CLI" + `${randomString}`;
        order['id'] = order_id;
        confirmDto.message.order = order;
        confirmDto.context.action = 'on_confirm';
        console.log("confirmDto", confirmDto);
        return confirmDto;
    }
    async handleRating(ratingDto) {
        const itemId = ratingDto.message.ratings[0].id;
        const rating = ratingDto.message.ratings[0].value;
        const feedback = ratingDto.message.ratings[0].feedback;
        const courseData = await this.hasuraService.rateFlnContentById(itemId, rating, feedback);
        const id = courseData.data.insert_Ratings.returning[0].id;
        ratingDto.context.action = 'on_rating';
        ratingDto.message = {
            "feedback_form": {
                "form": {
                    "url": `${this.base_url}/feedback/${id}`,
                    "mime_type": "text/html"
                },
                "required": true
            }
        };
        const resp = ratingDto;
        return resp;
    }
    async handleSubmit(description, id) {
        try {
            const courseData = await this.hasuraService.SubmitFeedback(description, id);
            return { message: "feedback submitted Successfully" };
        }
        catch (error) {
            return (error);
        }
    }
    isValidUrl(str) {
        try {
            new URL(str);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    ;
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService, hasura_service_1.HasuraService, auth_service_1.AuthService, s3_service_1.S3Service])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map