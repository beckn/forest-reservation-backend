"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedback = exports.averageRating = exports.confirmItemMapper = exports.selectItemMapper = exports.selectItemMapper1 = exports.generateOrder = exports.generateOrderFromProvider = exports.flnCatalogGenerator = void 0;
const generateTags = (provider) => {
    const tagsArr = [
        { key: "spatial_coverage", index: 4, display_name: "Spatial Coverage" },
        { key: "spatial_representation", index: 3, display_name: "Spatial representatiion type" },
        { key: "spatial_resolutions", index: 5, display_name: "Spatial Resolutions" },
        { key: "subscription_durations", index: 9, display_name: "Subscription duration" },
        { key: "temporal_coverage", index: 6, display_name: "Temporal Coverage" },
        { key: "temporal_resolutions", index: 7, display_name: "Temporal Resolutions" },
        { key: "confidence_levels", index: 1, display_name: getDisplayName('confidence_levels') },
        { key: "data_formats", index: 8, display_name: "Data formats" },
        { key: "datapoint", index: 2, display_name: getDisplayName('datapoint') }
    ].sort((a, b) => a.index - b.index);
    return tagsArr.map((data) => {
        const dataArr = provider[data.key] || [];
        const tag = {
            descriptor: {
                name: data.display_name
            },
            list: Array.from(dataArr).map((iValue) => {
                const item = {
                    value: iValue.toString()
                };
                return item;
            })
        };
        return tag;
    });
};
const getDisplayName = (key) => {
    const catalogArr = [
        ['national_meterological_department', 'weathermet', 'aquaweather'],
        ['ministry_of_health', 'statistics_bureau', 'ministry_of_home', 'lepro_care_foundation']
    ];
    const nameObj = [
        { 'confidence_levels': 'Forecast confidence levels', 'datapoint': 'Weather datapoints' },
        { 'confidence_levels': 'Model Confidence Levels', 'datapoint': 'Population Exposure Datapoints' },
    ];
    const defaultNames = { 'confidence_levels': 'Model Confidence Levels', 'datapoint': 'Flood Prediction Datapoints' };
    const dbName = process.env.DBNAME;
    const index = catalogArr.findIndex(function (sub) {
        return sub.includes(dbName);
    });
    return (index >= 0 ? nameObj[index][key] : defaultNames[key]) || '';
};
const flnCatalogGenerator = (apiData, query) => {
    console.log("apidata", apiData);
    const courses = apiData;
    const providerWise = {};
    let categories = new Set();
    courses.forEach((course, index) => {
        const item = course;
        const provider = course.id;
        if (providerWise[provider]) {
            providerWise[provider].push(item);
        }
        else {
            providerWise[provider] = [item];
        }
    });
    categories = [];
    const catalog = {};
    catalog['descriptor'] = { name: `Catalog for ${query}` };
    catalog['providers'] = Object.entries(providerWise).map(([providerId, providerArr]) => {
        const provider = providerArr[0];
        const pDescriptor = {
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
        };
        const iDescriptor = {
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
        };
        const locations = Array.from(provider["locations"]).map((value, index) => {
            const location = {
                id: (++index).toString(),
                city: {
                    name: value.toString()
                }
            };
            return location;
        });
        const item = {
            id: providerId,
            descriptor: iDescriptor,
            matched: true,
            price: {
                listed_value: "20.0",
                currency: "US",
                value: "12.0"
            },
            recommended: true,
            location_ids: locations.map((location) => {
                return location.id;
            }),
            fulfillment_ids: Array.from(provider["data_sharing_modes"]).map((value, index) => {
                return "F" + (index + 1);
            }),
            tags: generateTags(provider)
        };
        const providerObj = {
            id: provider["provider_name"],
            descriptor: pDescriptor,
            rating: provider["rating"],
            locations: locations,
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
                        }
                    ]
                }
            ],
            categories: [provider].map((course) => {
                const category = {
                    id: (course === null || course === void 0 ? void 0 : course.category) ? course.category : '',
                    descriptor: {
                        code: (course === null || course === void 0 ? void 0 : course.category) ? course.category : '',
                        name: (course === null || course === void 0 ? void 0 : course.category) ? course.category : '',
                    }
                };
                return category;
            }),
            fulfillments: Array.from(provider["data_sharing_modes"]).map((value, index) => {
                const fulfillment = { id: "F" + (index + 1), type: value.toString() };
                return fulfillment;
            }),
            items: [item]
        };
        return providerObj;
    });
    return catalog;
};
exports.flnCatalogGenerator = flnCatalogGenerator;
const generateOrderFromProvider = (provider) => {
    if (!provider)
        return { provider: {}, items: [], quote: {} };
    const pDescriptor = {
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
    const locations = Array.from(provider["locations"]).map((value, index) => {
        const location = {
            id: (++index).toString(),
            city: {
                name: value.toString()
            }
        };
        return location;
    });
    const providerObj = {
        id: provider["provider_name"],
        descriptor: pDescriptor,
        rating: provider["rating"],
        locations: locations
    };
    const iDescriptor = {
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
    };
    const item = {
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
        fulfillment_ids: Array.from(provider["data_sharing_modes"]).map((value, index) => {
            return "F" + (index + 1);
        }),
        tags: generateTags(provider)
    };
    const quote = {
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
    return { provider: providerObj, items: [item], quote: quote };
};
exports.generateOrderFromProvider = generateOrderFromProvider;
const generateOrder = (action, message_id, item, providerId, providerDescriptor, categoryId) => {
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
exports.generateOrder = generateOrder;
const selectItemMapper1 = (item) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    const selectItemOrder = {
        provider: {
            id: `${item.user_id}`,
            descriptor: {
                name: 'fln',
            },
        },
        items: [
            {
                id: `${item.id}`,
                parent_item_id: `${item.user_id}`,
                descriptor: {
                    name: item.title,
                    long_desc: item.description,
                },
                price: {
                    currency: 'INR',
                    value: '0',
                },
                category_id: (item === null || item === void 0 ? void 0 : item.category) ? item.category : '',
                recommended: false,
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
                                value: (_a = item.themes) !== null && _a !== void 0 ? _a : '',
                            },
                            {
                                name: 'sourceOrganisation',
                                value: (_b = item.sourceOrganisation) !== null && _b !== void 0 ? _b : '',
                            },
                            {
                                name: 'url',
                                value: (_c = item.link) !== null && _c !== void 0 ? _c : '',
                            },
                            {
                                name: 'publisher',
                                value: (_d = item.publisher) !== null && _d !== void 0 ? _d : '',
                            },
                            {
                                name: 'minAge',
                                value: (_e = item.minAge) !== null && _e !== void 0 ? _e : '',
                            },
                            {
                                name: 'maxAge',
                                value: (_f = item.maxAge) !== null && _f !== void 0 ? _f : '',
                            },
                            {
                                name: 'maxAge',
                                value: (_g = item.publisher) !== null && _g !== void 0 ? _g : '',
                            },
                            {
                                name: 'mimeType',
                                value: (_h = item.mimeType) !== null && _h !== void 0 ? _h : '',
                            },
                            {
                                name: 'image',
                                value: (_j = item.image) !== null && _j !== void 0 ? _j : '',
                            },
                            {
                                name: 'goal',
                                value: (_k = item.goal) !== null && _k !== void 0 ? _k : '',
                            },
                            {
                                name: 'domain',
                                value: (_l = item.domain) !== null && _l !== void 0 ? _l : '',
                            },
                            {
                                name: 'curricularGoals',
                                value: (_m = item.curricularGoals) !== null && _m !== void 0 ? _m : '',
                            },
                            {
                                name: 'competency',
                                value: (_o = item.competency) !== null && _o !== void 0 ? _o : '',
                            },
                            {
                                name: 'persona',
                                value: (_p = item.persona) !== null && _p !== void 0 ? _p : '',
                            },
                            {
                                name: 'license',
                                value: (_q = item.license) !== null && _q !== void 0 ? _q : '',
                            },
                            {
                                name: 'conditions',
                                value: (_r = item.conditions) !== null && _r !== void 0 ? _r : '',
                            },
                            {
                                name: 'enrollmentEndDate',
                                value: item.enrollmentEndDate ? item.enrollmentEndDate.toString() : '',
                            },
                            {
                                name: 'description',
                                value: (_s = item.description) !== null && _s !== void 0 ? _s : '',
                            },
                            {
                                name: 'domain',
                                value: (_t = item.domain) !== null && _t !== void 0 ? _t : '',
                            },
                            {
                                name: 'language',
                                value: (_u = item.language) !== null && _u !== void 0 ? _u : '',
                            },
                            {
                                name: 'link',
                                value: encodeURI(item.link || ''),
                            },
                            {
                                name: 'theme',
                                value: (_v = item.theme) !== null && _v !== void 0 ? _v : '',
                            },
                            {
                                name: 'minAge',
                                value: (_w = item.minAge) !== null && _w !== void 0 ? _w : '',
                            },
                            {
                                name: 'maxAge',
                                value: (_x = item.maxAge) !== null && _x !== void 0 ? _x : '',
                            },
                            {
                                name: 'author',
                                value: (_y = item.author) !== null && _y !== void 0 ? _y : '',
                            },
                            {
                                name: 'learningOutcomes',
                                value: (_z = item.learningOutcomes) !== null && _z !== void 0 ? _z : '',
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
exports.selectItemMapper1 = selectItemMapper1;
const selectItemMapper = (item) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    console.log("item 716", item);
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
                                value: (_a = item.title) !== null && _a !== void 0 ? _a : '',
                            },
                            {
                                descriptor: {
                                    code: "description",
                                    name: 'description',
                                },
                                value: (_b = item.description) !== null && _b !== void 0 ? _b : '',
                            },
                            {
                                descriptor: {
                                    code: "url",
                                    name: 'url',
                                },
                                value: (_c = item.link) !== null && _c !== void 0 ? _c : '',
                            },
                            {
                                descriptor: {
                                    code: "domain",
                                    name: 'domain',
                                },
                                value: (_d = item.domain) !== null && _d !== void 0 ? _d : '',
                            },
                            {
                                descriptor: {
                                    code: "goal",
                                    name: 'goal',
                                },
                                value: (_e = item.goal) !== null && _e !== void 0 ? _e : '',
                            },
                            {
                                descriptor: {
                                    code: "sourceOrganisation",
                                    name: 'sourceOrganisation',
                                },
                                value: (_f = item.sourceOrganisation) !== null && _f !== void 0 ? _f : '',
                            },
                            {
                                descriptor: {
                                    code: "publisher",
                                    name: 'publisher',
                                },
                                value: (_g = item.publisher) !== null && _g !== void 0 ? _g : '',
                            },
                            {
                                descriptor: {
                                    code: "learningOutcomes",
                                    name: 'learningOutcomes',
                                },
                                value: (_h = item.learningOutcomes) !== null && _h !== void 0 ? _h : '',
                            },
                            {
                                descriptor: {
                                    code: "expiryDate",
                                    name: 'expiryDate',
                                },
                                value: (_j = item.expiryDate) !== null && _j !== void 0 ? _j : '',
                            },
                            {
                                descriptor: {
                                    code: "minAge",
                                    name: 'minAge',
                                },
                                value: (item === null || item === void 0 ? void 0 : item.minAge) ? item.minAge.toString() : '',
                            },
                            {
                                descriptor: {
                                    code: "maxAge",
                                    name: 'maxAge',
                                },
                                value: (item === null || item === void 0 ? void 0 : item.maxAge) ? item.maxAge.toString() : '',
                            }
                        ],
                        display: true
                    },
                ],
            },
        ],
        fulfillments: [
            {
                agent: {
                    person: {
                        name: ""
                    },
                    contact: {
                        email: ""
                    }
                }
            }
        ],
    };
    return selectItemOrder;
};
exports.selectItemMapper = selectItemMapper;
const confirmItemMapper = (item) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    console.log("item 716--------------------------------------", item);
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
                    media: getMediaArray(item.OrderContentRelationship.link),
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
                                value: (_a = item.OrderContentRelationship.title) !== null && _a !== void 0 ? _a : '',
                            },
                            {
                                descriptor: {
                                    code: "description",
                                    name: 'description',
                                },
                                value: (_b = item.OrderContentRelationship.description) !== null && _b !== void 0 ? _b : '',
                            },
                            {
                                descriptor: {
                                    code: "url",
                                    name: 'url',
                                },
                                value: (_c = item.OrderContentRelationship.url) !== null && _c !== void 0 ? _c : '',
                            },
                            {
                                descriptor: {
                                    code: "domain",
                                    name: 'domain',
                                },
                                value: (_d = item.OrderContentRelationship.domain) !== null && _d !== void 0 ? _d : '',
                            },
                            {
                                descriptor: {
                                    code: "goal",
                                    name: 'goal',
                                },
                                value: (_e = item.OrderContentRelationship.goal) !== null && _e !== void 0 ? _e : '',
                            },
                            {
                                descriptor: {
                                    code: "sourceOrganisation",
                                    name: 'sourceOrganisation',
                                },
                                value: (_f = item.OrderContentRelationship.sourceOrganisation) !== null && _f !== void 0 ? _f : '',
                            },
                            {
                                descriptor: {
                                    code: "publisher",
                                    name: 'publisher',
                                },
                                value: (_g = item.OrderContentRelationship.publisher) !== null && _g !== void 0 ? _g : '',
                            },
                            {
                                descriptor: {
                                    code: "learningOutcomes",
                                    name: 'learningOutcomes',
                                },
                                value: (_h = item.OrderContentRelationship.learningOutcomes) !== null && _h !== void 0 ? _h : '',
                            },
                            {
                                descriptor: {
                                    code: "expiryDate",
                                    name: 'expiryDate',
                                },
                                value: (_j = item.OrderContentRelationship.expiryDate) !== null && _j !== void 0 ? _j : '',
                            },
                            {
                                descriptor: {
                                    code: "minAge",
                                    name: 'minAge',
                                },
                                value: (_k = item.OrderContentRelationship.minAge) !== null && _k !== void 0 ? _k : '',
                            },
                            {
                                descriptor: {
                                    code: "maxAge",
                                    name: 'maxAge',
                                },
                                value: (_l = item.OrderContentRelationship.maxAge) !== null && _l !== void 0 ? _l : '',
                            }
                        ],
                        display: true
                    },
                ],
            },
        ],
        fulfillments: [
            {
                state: {
                    descriptor: {
                        code: "",
                        name: ""
                    },
                    updated_at: new Date(Date.now())
                }
            },
            {
                agent: {
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
    };
    return confirmItemOrder;
};
exports.confirmItemMapper = confirmItemMapper;
const averageRating = (data) => {
    let sum = 0;
    const crr = data.FlnContentRatingsRelationship;
    console.log(crr.length);
    if (crr.length) {
        crr.forEach(i => sum += i.ratingValue);
    }
    const average = sum / crr.length;
    return average;
};
exports.averageRating = averageRating;
const feedback = (data) => {
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
exports.feedback = feedback;
const getMediaArray = (url) => {
    if (url) {
        const formattedUrl = isValidUrl(url);
        if (formattedUrl) {
            return [
                {
                    url: url,
                },
            ];
        }
        else {
            return [
                {
                    url: encodeURI('https://image/' + url)
                }
            ];
        }
    }
    return [];
};
const isValidUrl = (str) => {
    try {
        new URL(str);
        return true;
    }
    catch (error) {
        return false;
    }
};
//# sourceMappingURL=generator.js.map