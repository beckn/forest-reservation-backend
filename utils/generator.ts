import { components } from 'types/schema';
import { SwayamApiResponse } from 'types/SwayamApiResponse';
import { SwayamCourse } from 'types/SwayamCourese';

const generateTags = (provider:any):components['schemas']['Tags'][]=>{
  const tagsArr = [
    { key: "spatial_coverage", index: 4, display_name: "Spatial Coverage" },
    { key: "spatial_representation", index: 3, display_name: "Spatial representatiion type" },
    { key: "spatial_resolutions", index: 5, display_name: "Spatial Resolutions" },
    { key: "subscription_durations", index: 9, display_name: "Subscription duration" },
    { key: "temporal_coverage", index: 6, display_name: "Temporal Coverage" },
    { key: "temporal_resolutions", index: 7, display_name: getDisplayName('temporal_resolutions') },
    { key: "confidence_levels", index: 1, display_name:"Confidence Levels"},
    { key: "data_formats", index: 8, display_name: "Data formats" },
    { key: "datapoint", index: 2, display_name: getDisplayName('datapoint') }
  ].sort((a, b)=> a.index-b.index);
    return  tagsArr.map((data) => {
        const dataArr : any = provider[data.key] || [];
        const tag : components['schemas']['Tags'] = {
          descriptor: {
            name: data.display_name
          },
          list: Array.from(dataArr).map((iValue)=>{
            const item :components['schemas']['list'] = {
              value: iValue.toString()
            }
            return item;
          })
        }
        return tag;
  });
}

const getDisplayName = (key:string)=>{
  const catalogArr = [
    ['ecoclima','national_meteorological_department','ministry_of_agriculture_2',"indian_institute_of_technology"]
  ];
  const nameObj = [
    {'datapoint':'Climate datapoints','temporal_resolutions':"Soil datapoints"},
  ];
  const defaultNames = {'datapoint':'Forest datapoints','temporal_resolutions':"Soil hydrology"}
  const dbName = process.env.DBNAME;
  const index = catalogArr.findIndex(function(sub) {
    return sub.includes(dbName);
 });
  return (index>=0?nameObj[index][key]:defaultNames[key]) || '';
}

export const flnCatalogGenerator = (
  apiData: any,
  query: string,
) => {
  console.log("apidata", apiData)
  const courses: ReadonlyArray<{ node: any }> =
    apiData;
  const providerWise = {};
  let categories: any = new Set();

  courses.forEach((course: any, index) => {
    const item = course;
    const provider = course.id;
    // creating the provider wise map
    if (providerWise[provider]) {
      providerWise[provider].push(item);
    } else {
      providerWise[provider] = [item];
    }
  });

  categories = [];

  const catalog = {};
  catalog['descriptor'] = { name: `Catalog for ${query}` };

  // adding providers
  catalog['providers'] = Object.entries(providerWise).map(([providerId, providerArr]) => {
    const provider:any = providerArr[0];
    const pDescriptor:components['schemas']['Descriptor'] = {
      name: provider["provider_name"],
      short_desc: (provider["provider_description"]),
      long_desc: provider["provider_description"],
      additional_desc: {
          "url": "https://sample/about-us/",
          "content_type": "text/html"
      },
      images: [
        {
          "url": provider["image_url"],
          "size_type": "sm"
        }
      ],
    }

    const iDescriptor:components['schemas']['Descriptor'] = {
      images: [
        {
          url: provider["image_url"]
        }
      ],
      additional_desc: {
        url: "https://sample/downloadsample",
        content_type: "text/html"
      },
      name: provider["title"],
      short_desc: provider["provider_description"],
      long_desc: provider["provider_description"]
    }

    const locations = Array.from(provider["locations"]).map((value,index)=>{
      const location:components['schemas']["Location"] = {
        id: (++index).toString(),
        city: {
          name: value.toString()
        }
      }
      return location;
    })

    const item:components['schemas']["Item"] = {
      id: providerId,
      descriptor: iDescriptor,
      // time: {
      //   range: {
      //     "start": "01-01-2023",
      //     "end": "01-01-2024"
      //   }
      // },
      matched: true,
      price: {
        listed_value: "20.0",
        currency: "US",
        value: "12.0"
      },
      recommended: true,
      location_ids: locations.map((location)=>{
          return location.id
      }),
      //category_ids: [""],
      fulfillment_ids:Array.from(provider["data_sharing_modes"]).map((value,index)=>{
        return "F"+(index+1);
      }),
      tags:generateTags(provider)
    }

    const providerObj: components['schemas']['Provider'] = {
      id: provider["provider_name"],
      descriptor: pDescriptor,
      rating: provider["rating"],
      locations:locations,
      tags: [
        {
          descriptor: {
            name: "Provider's Additional Information"
          },
          list: [
            {
              descriptor: {
                name: "License"
              },
              value: provider["license"]
            },
            {
              descriptor: {
                name: "Provider's years in operation"
              },
              value: provider["provider_operation"]
            },
            {
              descriptor: {
                name: "Data collection method"
              },
              value: provider["collection_method"]
            }
          ]
        }
      ],
      categories: [provider].map((course: any) => {
        const category = {
          id: course?.category ? course.category : '',
          descriptor: {
            code: course?.category ? course.category : '',
            name: course?.category ? course.category : '',
          }
        };
        return category;
      }),
      fulfillments:Array.from(provider["data_sharing_modes"]).map((value,index)=>{
        const fulfillment :components['schemas']['Fulfillment'] = {id:"F"+(index+1),type:value.toString()};
        return fulfillment;
      }),
      items:[item]
    }
    
    return providerObj;
    }
  )

  return catalog;
};

export const generateOrderFromProvider = (provider:any)=>{

  if(!provider)return{provider:{},items:[],quote:{}};
  const pDescriptor:components['schemas']['Descriptor'] = {
    name: provider["provider_name"],
    additional_desc: {
        "url": "https://sample/about-us/",
        "content_type": "text/html"
    },
    images: [
      {
        "url": "https://onest-bucket.s3.ap-south-1.amazonaws.com/food1712576556406.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6EXR534WCJSR7T75%2F20240408%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240408T114236Z&X-Amz-Expires=36000&X-Amz-Signature=9b3573796405876dec6ee4b4631a29f415a5b33cfa389b0df273d32496c7a69c&X-Amz-SignedHeaders=host&x-id=GetObject",
        "size_type": "sm"
      }
    ],
  };

  const locations = Array.from(provider["locations"]).map((value,index)=>{
    const location:components['schemas']["Location"] = {
      id: (++index).toString(),
      city: {
        name: value.toString()
      }
    }
    return location;
  })

  const providerObj : components['schemas']['Provider'] = {
    id: provider["provider_name"],
    descriptor: pDescriptor,
    rating: provider["rating"],
    locations:locations
  };

  const iDescriptor:components['schemas']['Descriptor'] = {
    images: [
      {
        url: "https://onest-bucket.s3.ap-south-1.amazonaws.com/food1712576556406.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6EXR534WCJSR7T75%2F20240408%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240408T114236Z&X-Amz-Expires=36000&X-Amz-Signature=9b3573796405876dec6ee4b4631a29f415a5b33cfa389b0df273d32496c7a69c&X-Amz-SignedHeaders=host&x-id=GetObject"
      }
    ],
    additional_desc: {
      url: "https://sample/downloadsample",
      content_type: "text/html"
    },
    name: provider["title"],
    short_desc: provider["provider_description"],
    long_desc: provider["provider_description"]
  }

  const item:components['schemas']["Item"] = {
    id: provider.id.toString(),
    descriptor: iDescriptor,
    time: {
      range: {
        "start": "2023-01-01T00:00:00.000Z",
        "end": "2024-01-01T00:00:00.000Z"
      }
    },
    price: {
      listed_value: "20.0",
      currency: "US",
      value: "12.0"
    },
    //location_ids: [""],
    //category_ids: [""],
    fulfillment_ids:Array.from(provider["data_sharing_modes"]).map((value,index)=>{
      return "F"+(index+1);
    }),
    tags:generateTags(provider)
  }

  const quote:components['schemas']["Quotation"] = {
    price: {
      "currency": "USD",
      "value": "22.5"
    },
    breakup: [
      {
        title: "dataset-fee",
        price: {
          currency: "USD",
          value: "20.0"
        }
      },
      {
        title: "taxes",
        price: {
          currency: "INR",
          value: "2.5"
        }
      }
    ]
  };
  return {provider:providerObj,items:[item],quote:quote};
}

export const generateOrder = (
  action: string,
  message_id: string,
  item: any,
  providerId: string,
  providerDescriptor: any,
  categoryId: string,
) => {
  const order = {
    id: message_id + Date.now(),
    ref_order_ids: [],
    state: action === 'confirm' ? 'COMPLETE' : 'ACTIVE',
    type: 'DRAFT',
    provider: {
      id: providerId,
      descriptor: providerDescriptor,
      category_id: categoryId,
    },
    items: [item],
    fulfillments: {
      id: '',
      type: 'ONLINE',
      tracking: false,
      customer: {},
      agent: {},
      contact: {},
    },
    created_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
    tags: [
      {
        display: true,
        name: 'order tags',
        list: [
          {
            name: 'tag_name',
            value: 'value of the key in name',
            display: true,
          },
        ],
      },
    ],
  };

  return order;
};

export const selectItemMapper1 = (item: any) => {

  const selectItemOrder = {
    provider: {
      id: `${item.user_id}`,
      descriptor: {
        name: 'fln',
      },
      //category_id: item?.category ? item.category : '',
    },
    items: [
      {
        id: `${item.id}`,
        parent_item_id: `${item.user_id}`,
        descriptor: {
          name: item.title,
          long_desc: item.description,
          //images: [{ url: encodeURI(item.coursePictureUrl) }],
        },
        price: {
          currency: 'INR',
          value: '0',
        },
        category_id: item?.category ? item.category : '',
        recommended: false,
        // time: {
        //   label: 'Course Schedule',
        //   duration: `P${item.weeks}W`, // ISO 8601 duration format
        //   range: {
        //     start: item.startDate.toString(),
        //     end:
        //       item.endDate.toString() === ''
        //         ? item.startDate.toString()
        //         : item.endDate.toString(),
        //   },
        // },
        rating: Math.floor(Math.random() * 6).toString(),
        tags: [
          {
            name: 'courseDetails',
            list: [
              {
                name: 'title',
                value: item.title + '',
              },
              {
                name: 'themes',
                value: item.themes ?? '',
              },
              {
                name: 'sourceOrganisation',
                value: item.sourceOrganisation ?? '',
              },
              {
                name: 'url',
                value: item.link ?? '',
              },
              {
                name: 'publisher',
                value: item.publisher ?? '',
              },
              {
                name: 'minAge',
                value: item.minAge ?? '',
              },
              {
                name: 'maxAge',
                value: item.maxAge ?? '',
              },
              {
                name: 'maxAge',
                value: item.publisher ?? '',
              },
              {
                name: 'mimeType',
                value: item.mimeType ?? '',
              },
              {
                name: 'image',
                value: item.image ?? '',
              },
              {
                name: 'goal',
                value: item.goal ?? '',
              },
              {
                name: 'domain',
                value: item.domain ?? '',
              },
              {
                name: 'curricularGoals',
                value: item.curricularGoals ?? '',
              },
              {
                name: 'competency',
                value: item.competency ?? '',
              },
              {
                name: 'persona',
                value: item.persona ?? '',
              },
              {
                name: 'license',
                value: item.license ?? '',
              },
              {
                name: 'conditions',
                value: item.conditions ?? '',
              },
              {
                name: 'enrollmentEndDate',
                value: item.enrollmentEndDate ? item.enrollmentEndDate.toString() : '',
              },
              {
                name: 'description',
                value: item.description ?? '',
              },
              {
                name: 'domain',
                value: item.domain ?? '',
              },
              {
                name: 'language',
                value: item.language ?? '',
              },
              {
                name: 'link',
                value: encodeURI(item.link || ''),
              },
              {
                name: 'theme',
                value: item.theme ?? '',
              },
              {
                name: 'minAge',
                value: item.minAge ?? '',
              },
              {
                name: 'maxAge',
                value: item.maxAge ?? '',
              },
              {
                name: 'author',
                value: item.author ?? '',
              },
              {
                name: 'learningOutcomes',
                value: item.learningOutcomes ?? '',
              },
            ],
          },
        ],
        rateable: false,
      },
    ],
  };

  return selectItemOrder;
};

export const selectItemMapper = (item: any) => {
  console.log("item 716", item)
  const selectItemOrder = {
    provider: {
      id: `${item.user_id}`,
      descriptor: {
        name: 'fln',
        short_desc: "",
        images: getMediaArray(item.image)
      },
      categories: [
        {
          id: "",
          descriptor: {
            code: "",
            name: ""
          }
        },
        {
          id: "",
          descriptor: {
            code: "",
            name: ""
          }
        },
        {
          id: "",
          descriptor: {
            code: "",
            name: ""
          }
        }
      ]
    },
    items: [
      {
        id: `${item.id}`,
        quantity: {
          maximum: {
            count: 1
          }
        },
        parent_item_id: `${item.id}`,
        descriptor: {
          name: item.title,
          short_desc: "",
          long_desc: item.description,
          images: getMediaArray(item.image),
          media: []

        },
        creator: {
          descriptor: {
            name: "",
            short_desc: "",
            long_desc: "",
            images: []
          }
        },
        price: {
          currency: 'INR',
          value: '0',
        },
        category_ids: [
          "LANGUAGE-COURSES",
          "SELF-PACED-COURSES"
        ],
        rating: Math.floor(Math.random() * 6).toString(),
        rateable: false,
        tags: [
          {
            descriptor: {
              code: "courseDetails",
              name: 'courseDetails',
            },
            list: [
              {
                descriptor: {
                  code: "title",
                  name: 'title',
                },
                value: item.title ?? '',
              },

              {
                descriptor: {
                  code: "description",
                  name: 'description',
                },
                value: item.description ?? '',
              },
              {
                descriptor: {
                  code: "url",
                  name: 'url',
                },
                value: item.link ?? '',
              },
              {
                descriptor: {
                  code: "domain",
                  name: 'domain',
                },
                value: item.domain ?? '',
              },
              {
                descriptor: {
                  code: "goal",
                  name: 'goal',
                },
                value: item.goal ?? '',
              },
              {
                descriptor: {
                  code: "sourceOrganisation",
                  name: 'sourceOrganisation',
                },
                value: item.sourceOrganisation ?? '',
              },
              {
                descriptor: {
                  code: "publisher",
                  name: 'publisher',
                },
                value: item.publisher ?? '',
              },
              {
                descriptor: {
                  code: "learningOutcomes",
                  name: 'learningOutcomes',
                },
                value: item.learningOutcomes ?? '',
              },
              {
                descriptor: {
                  code: "expiryDate",
                  name: 'expiryDate',
                },
                value: item.expiryDate ?? '',
              },
              // {
              //   name: 'state',
              //   value: item.state ?? '',
              // },
              // {
              //   name: 'region',
              //   value: item.region ?? '',
              // },
              {
                descriptor: {
                  code: "minAge",
                  name: 'minAge',
                },
                value: item?.minAge ? item.minAge.toString() : '',
              },
              {
                descriptor: {
                  code: "maxAge",
                  name: 'maxAge',
                },
                value: item?.maxAge ? item.maxAge.toString() : '',
              }
            ],
            display: true
          },
        ],
      },
    ],
    fulfillments: [
      {
        agent:
        {
          person: {
            name: ""
          },
          contact: {
            email: ""
          }

        }
      }
    ],
    // quote:{
    //   price:{
    //     currency:"",
    //     value:""
    //   }
    // }
  };

  return selectItemOrder;
};

export const confirmItemMapper = (item: any) => {
  console.log("item 716--------------------------------------", item)

  const confirmItemOrder = {
    id: `${item.order_id}` ? `${item.order_id}` : "",
    provider: {
      id: `${item.OrderContentRelationship.user_id}` ? `${item.OrderContentRelationship.user_id}` : "",
      descriptor: {
        name: 'fln',
        short_desc: "",
        images: getMediaArray(item.OrderContentRelationship.image)
      },
      categories: [
        {
          id: "",
          descriptor: {
            code: "",
            name: ""
          }
        },
        {
          id: "",
          descriptor: {
            code: "",
            name: ""
          }
        },
        {
          id: "",
          descriptor: {
            code: "",
            name: ""
          }
        }
      ]
    },
    items: [
      {
        id: `${item.content_id}`,
        quantity: {
          maximum: {
            count: 1
          }
        },
        descriptor: {
          name: `${item.OrderContentRelationship.title}` ? `${item.OrderContentRelationship.title}` : "",
          short_desc: "",
          long_desc: `${item.OrderContentRelationship.description}` ? `${item.OrderContentRelationship.description}` : "",
          images: [],
          media:
            getMediaArray(item.OrderContentRelationship.link),
        },
        creator: {
          descriptor: {
            name: "",
            short_desc: "",
            long_desc: "",
            images: []
          }
        },
        price: {
          currency: 'INR',
          value: '0',
        },
        category_ids: [
          ""
        ],
        rating: Math.floor(Math.random() * 6).toString(),
        rateable: false,
        add_ons: [
          {
            id: "",
            descriptor: {
              name: "",
              long_desc: "",
              media: []
            }
          },
          {
            id: "",
            descriptor: {
              name: "",
              long_desc: "",
              media: []
            }
          }

        ],
        tags: [
          {
            descriptor: {
              code: "courseDetails",
              name: 'courseDetails',
            },
            list: [
              {
                descriptor: {
                  code: "title",
                  name: 'title',
                },
                value: item.OrderContentRelationship.title ?? '',
              },

              {
                descriptor: {
                  code: "description",
                  name: 'description',
                },
                value: item.OrderContentRelationship.description ?? '',
              },
              {
                descriptor: {
                  code: "url",
                  name: 'url',
                },
                value: item.OrderContentRelationship.url ?? '',
              },
              {
                descriptor: {
                  code: "domain",
                  name: 'domain',
                },
                value: item.OrderContentRelationship.domain ?? '',
              },
              {
                descriptor: {
                  code: "goal",
                  name: 'goal',
                },
                value: item.OrderContentRelationship.goal ?? '',
              },
              {
                descriptor: {
                  code: "sourceOrganisation",
                  name: 'sourceOrganisation',
                },
                value: item.OrderContentRelationship.sourceOrganisation ?? '',
              },
              {
                descriptor: {
                  code: "publisher",
                  name: 'publisher',
                },
                value: item.OrderContentRelationship.publisher ?? '',
              },
              {
                descriptor: {
                  code: "learningOutcomes",
                  name: 'learningOutcomes',
                },
                value: item.OrderContentRelationship.learningOutcomes ?? '',
              },
              {
                descriptor: {
                  code: "expiryDate",
                  name: 'expiryDate',
                },
                value: item.OrderContentRelationship.expiryDate ?? '',
              },
              // {
              //   name: 'state',
              //   value: item.state ?? '',
              // },
              // {
              //   name: 'region',
              //   value: item.region ?? '',
              // },
              {
                descriptor: {
                  code: "minAge",
                  name: 'minAge',
                },
                value: item.OrderContentRelationship.minAge ?? '',
              },
              {
                descriptor: {
                  code: "maxAge",
                  name: 'maxAge',
                },
                value: item.OrderContentRelationship.maxAge ?? '',
              }
            ],
            display: true
          },
        ],
      },
    ],
    fulfillments: [
      {
        state:
        {
          descriptor: {
            code: "",
            name: ""
          },
          updated_at: new Date(Date.now())

        }
      },
      {
        agent:
        {
          person: {
            name: ""
          },
          contact: {
            email: ""
          }

        },
        customer: {
          person: {
            name: item.OrdersUserRelationship[0].name ? item.OrdersUserRelationship[0].name : "",
            age: item.OrdersUserRelationship[0].age ? item.OrdersUserRelationship[0].age : "",
            gender: item.OrdersUserRelationship[0].gender ? item.OrdersUserRelationship[0].gender : "",
          },
          contact: {
            phone: item.OrdersUserRelationship[0].phone ? item.OrdersUserRelationship[0].phone : "",
            email: item.OrdersUserRelationship[0].email ? item.OrdersUserRelationship[0].email : "",
          }
        },
        stops: [

          {
            id: "0",
            instructions: {
              name: "",
              long_desc: "",
              media: []
            }
          },
          {
            id: "1",
            instructions: {
              name: "",
              long_desc: "",
              media: []
            }
          },


        ],
        tags: [
          {
            descriptor: {
              code: "",
              name: ""
            },
            list: [
              {
                descriptor: {
                  code: "",
                  name: ""
                },
                value: ""

              },
              {
                descriptor: {
                  code: "",
                  name: ""
                },
                value: ""

              }
            ],
            display: true,

          }
        ]
      }
    ],
    quote: {
      price: {
        currency: "INR",
        value: "150",
      }
    },
    // billing:{
    //   name:"",
    //   phone:"",
    //   email:"",
    //   address:""
    // },
    payments: [
      {
        params: {
          amount: "150",
          currency: "INR",
        },
        type: "PRE-ORDER",
        status: "PAID",
        collected_by: "bpp"
      }
    ]
  }



  return confirmItemOrder;
};

export const averageRating = (
  data: any
) => {
  let sum = 0;

  const crr = data.FlnContentRatingsRelationship
  console.log(crr.length)

  if (crr.length) {
    crr.forEach(i => sum += i.ratingValue)
  }

  const average = sum / crr.length
  return average

}

export const feedback = (data: any) => {
  const result = {
    ratingValues: [],
    feedbacks: [],
  };

  const filteredData = data.FlnContentRatingsRelationship
    .filter(item => item.feedback && item.feedback.trim() !== "null" && item.feedback.trim() !== "undefined");
  filteredData.sort((a, b) => b.id - a.id);


  const maxItems = Math.min(filteredData.length, 5);

  for (let i = 0; i < maxItems; i++) {
    const currentItem = filteredData[i];
    if (currentItem.ratingValue) {
      result.ratingValues.push(currentItem.ratingValue);
    }
    if (currentItem.feedback) {
      result.feedbacks.push(currentItem.feedback);
    }
  }

  return result;
};

// const getMediaArray = (url: string | undefined) => {
//   if (url) {
//     return [
//       {
//         url:encodeURI(url),
//       },
//     ];
//   }
//   return [];
// };

const getMediaArray = (url: string | undefined) => {
  if (url) {
    const formattedUrl = isValidUrl(url)
    if (formattedUrl) {
      return [
        {
          url: url,
        },
      ]
    }
    else {
      return [
        {
          url: encodeURI('https://image/' + url)
        }
      ]
    }
  }
  return [];
};

// Function to check if a string is a valid URL
const isValidUrl = (str: string) => {
  try {
    new URL(str);
    return true;
  } catch (error) {
    return false;
  }
};

