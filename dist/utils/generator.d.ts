export declare const flnCatalogGenerator: (apiData: any, query: string) => {};
export declare const generateOrderFromProvider: (provider: any) => {
    provider: {
        id?: string;
        descriptor?: {
            name?: string;
            code?: string;
            symbol?: string;
            short_desc?: string;
            long_desc?: string;
            additional_desc?: {
                url: string;
                content_type: string;
            };
            operation?: string;
            images?: {
                url: string;
                size_type?: string;
            }[];
            audio?: string;
            video?: string;
            '3d_render'?: string;
        };
        category_id?: string;
        rating?: string;
        time?: {
            label?: string;
            timestamp?: string;
            duration?: string;
            range?: {
                start?: string;
                end?: string;
            };
            days?: string;
            schedule?: {
                frequency?: string;
                holidays?: string[];
                times?: string[];
            };
        };
        categories?: {
            id?: string;
            parent_category_id?: string;
            descriptor?: {
                name?: string;
                code?: string;
                symbol?: string;
                short_desc?: string;
                long_desc?: string;
                additional_desc?: {
                    url: string;
                    content_type: string;
                };
                operation?: string;
                images?: {
                    url: string;
                    size_type?: string;
                }[];
                audio?: string;
                video?: string;
                '3d_render'?: string;
            };
            time?: {
                label?: string;
                timestamp?: string;
                duration?: string;
                range?: {
                    start?: string;
                    end?: string;
                };
                days?: string;
                schedule?: {
                    frequency?: string;
                    holidays?: string[];
                    times?: string[];
                };
            };
            tags?: {
                descriptor?: {
                    name?: string;
                    code?: string;
                    symbol?: string;
                    short_desc?: string;
                    long_desc?: string;
                    additional_desc?: {
                        url: string;
                        content_type: string;
                    };
                    operation?: string;
                    images?: {
                        url: string;
                        size_type?: string;
                    }[];
                    audio?: string;
                    video?: string;
                    '3d_render'?: string;
                };
                list?: {
                    descriptor?: {
                        name?: string;
                        code?: string;
                        symbol?: string;
                        short_desc?: string;
                        long_desc?: string;
                        additional_desc?: {
                            url: string;
                            content_type: string;
                        };
                        operation?: string;
                        images?: {
                            url: string;
                            size_type?: string;
                        }[];
                        audio?: string;
                        video?: string;
                        '3d_render'?: string;
                    };
                    value?: string;
                }[];
            };
        }[];
        fulfillments?: {
            id?: string;
            type?: string;
            provider_id?: string;
            rating?: string;
            state?: {
                descriptor?: {
                    name?: string;
                    code?: string;
                    symbol?: string;
                    short_desc?: string;
                    long_desc?: string;
                    additional_desc?: {
                        url: string;
                        content_type: string;
                    };
                    operation?: string;
                    images?: {
                        url: string;
                        size_type?: string;
                    }[];
                    audio?: string;
                    video?: string;
                    '3d_render'?: string;
                };
                updated_at?: string;
                updated_by?: string;
            };
            tracking?: boolean;
            customer?: {
                person?: {
                    id?: string;
                    name?: string;
                    image?: {
                        url: string;
                        size_type?: string;
                    };
                    dob?: string;
                    gender?: string;
                    creds?: {
                        id?: string;
                        type?: string;
                        issuer?: string;
                        issuance_date?: string;
                        credential_subject?: {
                            id?: string;
                            additionalProperties?: Record<string, never>;
                        };
                        credential_schema?: {
                            id?: string;
                            type?: string;
                        };
                    }[];
                    tags?: {
                        descriptor?: {
                            name?: string;
                            code?: string;
                            symbol?: string;
                            short_desc?: string;
                            long_desc?: string;
                            additional_desc?: {
                                url: string;
                                content_type: string;
                            };
                            operation?: string;
                            images?: {
                                url: string;
                                size_type?: string;
                            }[];
                            audio?: string;
                            video?: string;
                            '3d_render'?: string;
                        };
                        list?: {
                            descriptor?: {
                                name?: string;
                                code?: string;
                                symbol?: string;
                                short_desc?: string;
                                long_desc?: string;
                                additional_desc?: {
                                    url: string;
                                    content_type: string;
                                };
                                operation?: string;
                                images?: {
                                    url: string;
                                    size_type?: string;
                                }[];
                                audio?: string;
                                video?: string;
                                '3d_render'?: string;
                            };
                            value?: string;
                        }[];
                    };
                };
                contact?: {
                    name?: string;
                    address?: {
                        full?: string;
                        door?: string;
                        name?: string;
                        building?: string;
                        street?: string;
                        locality?: string;
                        ward?: string;
                        city?: string;
                        state?: string;
                        country?: string;
                        area_code?: string;
                    };
                    phone?: string;
                    email?: string;
                    jcard?: Record<string, never>;
                    tags?: {
                        descriptor?: {
                            name?: string;
                            code?: string;
                            symbol?: string;
                            short_desc?: string;
                            long_desc?: string;
                            additional_desc?: {
                                url: string;
                                content_type: string;
                            };
                            operation?: string;
                            images?: {
                                url: string;
                                size_type?: string;
                            }[];
                            audio?: string;
                            video?: string;
                            '3d_render'?: string;
                        };
                        list?: {
                            descriptor?: {
                                name?: string;
                                code?: string;
                                symbol?: string;
                                short_desc?: string;
                                long_desc?: string;
                                additional_desc?: {
                                    url: string;
                                    content_type: string;
                                };
                                operation?: string;
                                images?: {
                                    url: string;
                                    size_type?: string;
                                }[];
                                audio?: string;
                                video?: string;
                                '3d_render'?: string;
                            };
                            value?: string;
                        }[];
                    };
                };
            };
            agent?: {
                id?: string;
                name?: string;
                image?: {
                    url: string;
                    size_type?: string;
                };
                dob?: string;
                gender?: string;
                creds?: {
                    id?: string;
                    type?: string;
                    issuer?: string;
                    issuance_date?: string;
                    credential_subject?: {
                        id?: string;
                        additionalProperties?: Record<string, never>;
                    };
                    credential_schema?: {
                        id?: string;
                        type?: string;
                    };
                }[];
                tags?: {
                    descriptor?: {
                        name?: string;
                        code?: string;
                        symbol?: string;
                        short_desc?: string;
                        long_desc?: string;
                        additional_desc?: {
                            url: string;
                            content_type: string;
                        };
                        operation?: string;
                        images?: {
                            url: string;
                            size_type?: string;
                        }[];
                        audio?: string;
                        video?: string;
                        '3d_render'?: string;
                    };
                    list?: {
                        descriptor?: {
                            name?: string;
                            code?: string;
                            symbol?: string;
                            short_desc?: string;
                            long_desc?: string;
                            additional_desc?: {
                                url: string;
                                content_type: string;
                            };
                            operation?: string;
                            images?: {
                                url: string;
                                size_type?: string;
                            }[];
                            audio?: string;
                            video?: string;
                            '3d_render'?: string;
                        };
                        value?: string;
                    }[];
                };
            } & {
                name?: string;
                address?: {
                    full?: string;
                    door?: string;
                    name?: string;
                    building?: string;
                    street?: string;
                    locality?: string;
                    ward?: string;
                    city?: string;
                    state?: string;
                    country?: string;
                    area_code?: string;
                };
                phone?: string;
                email?: string;
                jcard?: Record<string, never>;
                tags?: {
                    descriptor?: {
                        name?: string;
                        code?: string;
                        symbol?: string;
                        short_desc?: string;
                        long_desc?: string;
                        additional_desc?: {
                            url: string;
                            content_type: string;
                        };
                        operation?: string;
                        images?: {
                            url: string;
                            size_type?: string;
                        }[];
                        audio?: string;
                        video?: string;
                        '3d_render'?: string;
                    };
                    list?: {
                        descriptor?: {
                            name?: string;
                            code?: string;
                            symbol?: string;
                            short_desc?: string;
                            long_desc?: string;
                            additional_desc?: {
                                url: string;
                                content_type: string;
                            };
                            operation?: string;
                            images?: {
                                url: string;
                                size_type?: string;
                            }[];
                            audio?: string;
                            video?: string;
                            '3d_render'?: string;
                        };
                        value?: string;
                    }[];
                };
            } & {
                rateable?: boolean;
            };
            person?: {
                id?: string;
                name?: string;
                image?: {
                    url: string;
                    size_type?: string;
                };
                dob?: string;
                gender?: string;
                creds?: {
                    id?: string;
                    type?: string;
                    issuer?: string;
                    issuance_date?: string;
                    credential_subject?: {
                        id?: string;
                        additionalProperties?: Record<string, never>;
                    };
                    credential_schema?: {
                        id?: string;
                        type?: string;
                    };
                }[];
                tags?: {
                    descriptor?: {
                        name?: string;
                        code?: string;
                        symbol?: string;
                        short_desc?: string;
                        long_desc?: string;
                        additional_desc?: {
                            url: string;
                            content_type: string;
                        };
                        operation?: string;
                        images?: {
                            url: string;
                            size_type?: string;
                        }[];
                        audio?: string;
                        video?: string;
                        '3d_render'?: string;
                    };
                    list?: {
                        descriptor?: {
                            name?: string;
                            code?: string;
                            symbol?: string;
                            short_desc?: string;
                            long_desc?: string;
                            additional_desc?: {
                                url: string;
                                content_type: string;
                            };
                            operation?: string;
                            images?: {
                                url: string;
                                size_type?: string;
                            }[];
                            audio?: string;
                            video?: string;
                            '3d_render'?: string;
                        };
                        value?: string;
                    }[];
                };
            };
            contact?: {
                name?: string;
                address?: {
                    full?: string;
                    door?: string;
                    name?: string;
                    building?: string;
                    street?: string;
                    locality?: string;
                    ward?: string;
                    city?: string;
                    state?: string;
                    country?: string;
                    area_code?: string;
                };
                phone?: string;
                email?: string;
                jcard?: Record<string, never>;
                tags?: {
                    descriptor?: {
                        name?: string;
                        code?: string;
                        symbol?: string;
                        short_desc?: string;
                        long_desc?: string;
                        additional_desc?: {
                            url: string;
                            content_type: string;
                        };
                        operation?: string;
                        images?: {
                            url: string;
                            size_type?: string;
                        }[];
                        audio?: string;
                        video?: string;
                        '3d_render'?: string;
                    };
                    list?: {
                        descriptor?: {
                            name?: string;
                            code?: string;
                            symbol?: string;
                            short_desc?: string;
                            long_desc?: string;
                            additional_desc?: {
                                url: string;
                                content_type: string;
                            };
                            operation?: string;
                            images?: {
                                url: string;
                                size_type?: string;
                            }[];
                            audio?: string;
                            video?: string;
                            '3d_render'?: string;
                        };
                        value?: string;
                    }[];
                };
            };
            vehicle?: {
                category?: string;
                capacity?: number;
                make?: string;
                model?: string;
                size?: string;
                variant?: string;
                color?: string;
                energy_type?: string;
                registration?: string;
            };
            start?: {
                location?: {
                    id?: string;
                    descriptor?: {
                        name?: string;
                        code?: string;
                        symbol?: string;
                        short_desc?: string;
                        long_desc?: string;
                        additional_desc?: {
                            url: string;
                            content_type: string;
                        };
                        operation?: string;
                        images?: {
                            url: string;
                            size_type?: string;
                        }[];
                        audio?: string;
                        video?: string;
                        '3d_render'?: string;
                    };
                    gps?: string;
                    address?: {
                        full?: string;
                        door?: string;
                        name?: string;
                        building?: string;
                        street?: string;
                        locality?: string;
                        ward?: string;
                        city?: string;
                        state?: string;
                        country?: string;
                        area_code?: string;
                    };
                    station_code?: string;
                    city?: {
                        name?: string;
                        code?: string;
                    };
                    country?: {
                        name?: string;
                        code?: string;
                    };
                    circle?: {
                        gps: string;
                        radius: {
                            type?: "CONSTANT" | "VARIABLE";
                            value?: string;
                            estimated_value?: string;
                            computed_value?: string;
                            range?: {
                                min?: string;
                                max?: string;
                            };
                            unit?: string;
                        };
                    };
                    polygon?: string;
                    '3dspace'?: string;
                    time?: {
                        label?: string;
                        timestamp?: string;
                        duration?: string;
                        range?: {
                            start?: string;
                            end?: string;
                        };
                        days?: string;
                        schedule?: {
                            frequency?: string;
                            holidays?: string[];
                            times?: string[];
                        };
                    };
                };
                time?: {
                    label?: string;
                    timestamp?: string;
                    duration?: string;
                    range?: {
                        start?: string;
                        end?: string;
                    };
                    days?: string;
                    schedule?: {
                        frequency?: string;
                        holidays?: string[];
                        times?: string[];
                    };
                };
                instructions?: {
                    name?: string;
                    code?: string;
                    symbol?: string;
                    short_desc?: string;
                    long_desc?: string;
                    additional_desc?: {
                        url: string;
                        content_type: string;
                    };
                    operation?: string;
                    images?: {
                        url: string;
                        size_type?: string;
                    }[];
                    audio?: string;
                    video?: string;
                    '3d_render'?: string;
                };
                contact?: {
                    name?: string;
                    address?: {
                        full?: string;
                        door?: string;
                        name?: string;
                        building?: string;
                        street?: string;
                        locality?: string;
                        ward?: string;
                        city?: string;
                        state?: string;
                        country?: string;
                        area_code?: string;
                    };
                    phone?: string;
                    email?: string;
                    jcard?: Record<string, never>;
                    tags?: {
                        descriptor?: {
                            name?: string;
                            code?: string;
                            symbol?: string;
                            short_desc?: string;
                            long_desc?: string;
                            additional_desc?: {
                                url: string;
                                content_type: string;
                            };
                            operation?: string;
                            images?: {
                                url: string;
                                size_type?: string;
                            }[];
                            audio?: string;
                            video?: string;
                            '3d_render'?: string;
                        };
                        list?: {
                            descriptor?: {
                                name?: string;
                                code?: string;
                                symbol?: string;
                                short_desc?: string;
                                long_desc?: string;
                                additional_desc?: {
                                    url: string;
                                    content_type: string;
                                };
                                operation?: string;
                                images?: {
                                    url: string;
                                    size_type?: string;
                                }[];
                                audio?: string;
                                video?: string;
                                '3d_render'?: string;
                            };
                            value?: string;
                        }[];
                    };
                };
                person?: {
                    id?: string;
                    name?: string;
                    image?: {
                        url: string;
                        size_type?: string;
                    };
                    dob?: string;
                    gender?: string;
                    creds?: {
                        id?: string;
                        type?: string;
                        issuer?: string;
                        issuance_date?: string;
                        credential_subject?: {
                            id?: string;
                            additionalProperties?: Record<string, never>;
                        };
                        credential_schema?: {
                            id?: string;
                            type?: string;
                        };
                    }[];
                    tags?: {
                        descriptor?: {
                            name?: string;
                            code?: string;
                            symbol?: string;
                            short_desc?: string;
                            long_desc?: string;
                            additional_desc?: {
                                url: string;
                                content_type: string;
                            };
                            operation?: string;
                            images?: {
                                url: string;
                                size_type?: string;
                            }[];
                            audio?: string;
                            video?: string;
                            '3d_render'?: string;
                        };
                        list?: {
                            descriptor?: {
                                name?: string;
                                code?: string;
                                symbol?: string;
                                short_desc?: string;
                                long_desc?: string;
                                additional_desc?: {
                                    url: string;
                                    content_type: string;
                                };
                                operation?: string;
                                images?: {
                                    url: string;
                                    size_type?: string;
                                }[];
                                audio?: string;
                                video?: string;
                                '3d_render'?: string;
                            };
                            value?: string;
                        }[];
                    };
                };
                authorization?: {
                    type?: string;
                    token?: string;
                    valid_from?: string;
                    valid_to?: string;
                    status?: string;
                };
            };
            end?: {
                location?: {
                    id?: string;
                    descriptor?: {
                        name?: string;
                        code?: string;
                        symbol?: string;
                        short_desc?: string;
                        long_desc?: string;
                        additional_desc?: {
                            url: string;
                            content_type: string;
                        };
                        operation?: string;
                        images?: {
                            url: string;
                            size_type?: string;
                        }[];
                        audio?: string;
                        video?: string;
                        '3d_render'?: string;
                    };
                    gps?: string;
                    address?: {
                        full?: string;
                        door?: string;
                        name?: string;
                        building?: string;
                        street?: string;
                        locality?: string;
                        ward?: string;
                        city?: string;
                        state?: string;
                        country?: string;
                        area_code?: string;
                    };
                    station_code?: string;
                    city?: {
                        name?: string;
                        code?: string;
                    };
                    country?: {
                        name?: string;
                        code?: string;
                    };
                    circle?: {
                        gps: string;
                        radius: {
                            type?: "CONSTANT" | "VARIABLE";
                            value?: string;
                            estimated_value?: string;
                            computed_value?: string;
                            range?: {
                                min?: string;
                                max?: string;
                            };
                            unit?: string;
                        };
                    };
                    polygon?: string;
                    '3dspace'?: string;
                    time?: {
                        label?: string;
                        timestamp?: string;
                        duration?: string;
                        range?: {
                            start?: string;
                            end?: string;
                        };
                        days?: string;
                        schedule?: {
                            frequency?: string;
                            holidays?: string[];
                            times?: string[];
                        };
                    };
                };
                time?: {
                    label?: string;
                    timestamp?: string;
                    duration?: string;
                    range?: {
                        start?: string;
                        end?: string;
                    };
                    days?: string;
                    schedule?: {
                        frequency?: string;
                        holidays?: string[];
                        times?: string[];
                    };
                };
                instructions?: {
                    name?: string;
                    code?: string;
                    symbol?: string;
                    short_desc?: string;
                    long_desc?: string;
                    additional_desc?: {
                        url: string;
                        content_type: string;
                    };
                    operation?: string;
                    images?: {
                        url: string;
                        size_type?: string;
                    }[];
                    audio?: string;
                    video?: string;
                    '3d_render'?: string;
                };
                contact?: {
                    name?: string;
                    address?: {
                        full?: string;
                        door?: string;
                        name?: string;
                        building?: string;
                        street?: string;
                        locality?: string;
                        ward?: string;
                        city?: string;
                        state?: string;
                        country?: string;
                        area_code?: string;
                    };
                    phone?: string;
                    email?: string;
                    jcard?: Record<string, never>;
                    tags?: {
                        descriptor?: {
                            name?: string;
                            code?: string;
                            symbol?: string;
                            short_desc?: string;
                            long_desc?: string;
                            additional_desc?: {
                                url: string;
                                content_type: string;
                            };
                            operation?: string;
                            images?: {
                                url: string;
                                size_type?: string;
                            }[];
                            audio?: string;
                            video?: string;
                            '3d_render'?: string;
                        };
                        list?: {
                            descriptor?: {
                                name?: string;
                                code?: string;
                                symbol?: string;
                                short_desc?: string;
                                long_desc?: string;
                                additional_desc?: {
                                    url: string;
                                    content_type: string;
                                };
                                operation?: string;
                                images?: {
                                    url: string;
                                    size_type?: string;
                                }[];
                                audio?: string;
                                video?: string;
                                '3d_render'?: string;
                            };
                            value?: string;
                        }[];
                    };
                };
                person?: {
                    id?: string;
                    name?: string;
                    image?: {
                        url: string;
                        size_type?: string;
                    };
                    dob?: string;
                    gender?: string;
                    creds?: {
                        id?: string;
                        type?: string;
                        issuer?: string;
                        issuance_date?: string;
                        credential_subject?: {
                            id?: string;
                            additionalProperties?: Record<string, never>;
                        };
                        credential_schema?: {
                            id?: string;
                            type?: string;
                        };
                    }[];
                    tags?: {
                        descriptor?: {
                            name?: string;
                            code?: string;
                            symbol?: string;
                            short_desc?: string;
                            long_desc?: string;
                            additional_desc?: {
                                url: string;
                                content_type: string;
                            };
                            operation?: string;
                            images?: {
                                url: string;
                                size_type?: string;
                            }[];
                            audio?: string;
                            video?: string;
                            '3d_render'?: string;
                        };
                        list?: {
                            descriptor?: {
                                name?: string;
                                code?: string;
                                symbol?: string;
                                short_desc?: string;
                                long_desc?: string;
                                additional_desc?: {
                                    url: string;
                                    content_type: string;
                                };
                                operation?: string;
                                images?: {
                                    url: string;
                                    size_type?: string;
                                }[];
                                audio?: string;
                                video?: string;
                                '3d_render'?: string;
                            };
                            value?: string;
                        }[];
                    };
                };
                authorization?: {
                    type?: string;
                    token?: string;
                    valid_from?: string;
                    valid_to?: string;
                    status?: string;
                };
            };
            rateable?: boolean;
            tags?: {
                descriptor?: {
                    name?: string;
                    code?: string;
                    symbol?: string;
                    short_desc?: string;
                    long_desc?: string;
                    additional_desc?: {
                        url: string;
                        content_type: string;
                    };
                    operation?: string;
                    images?: {
                        url: string;
                        size_type?: string;
                    }[];
                    audio?: string;
                    video?: string;
                    '3d_render'?: string;
                };
                list?: {
                    descriptor?: {
                        name?: string;
                        code?: string;
                        symbol?: string;
                        short_desc?: string;
                        long_desc?: string;
                        additional_desc?: {
                            url: string;
                            content_type: string;
                        };
                        operation?: string;
                        images?: {
                            url: string;
                            size_type?: string;
                        }[];
                        audio?: string;
                        video?: string;
                        '3d_render'?: string;
                    };
                    value?: string;
                }[];
            }[];
            stops?: {
                type: string;
                instructions: {
                    short_desc: string;
                };
            }[];
        }[];
        payments?: {
            id?: string;
            uri?: string;
            params?: {
                transaction_id?: string;
                transaction_status?: string;
                amount?: string;
                currency?: string;
                bank_code?: string;
                bank_account_number?: string;
                virtual_payment_address?: string;
            };
            type?: "ON-ORDER" | "PRE-FULFILLMENT" | "ON-FULFILLMENT" | "POST-FULFILLMENT";
            status?: "PAID" | "NOT-PAID";
            time?: {
                label?: string;
                timestamp?: string;
                duration?: string;
                range?: {
                    start?: string;
                    end?: string;
                };
                days?: string;
                schedule?: {
                    frequency?: string;
                    holidays?: string[];
                    times?: string[];
                };
            };
        }[];
        locations?: ({
            id?: string;
            descriptor?: {
                name?: string;
                code?: string;
                symbol?: string;
                short_desc?: string;
                long_desc?: string;
                additional_desc?: {
                    url: string;
                    content_type: string;
                };
                operation?: string;
                images?: {
                    url: string;
                    size_type?: string;
                }[];
                audio?: string;
                video?: string;
                '3d_render'?: string;
            };
            gps?: string;
            address?: {
                full?: string;
                door?: string;
                name?: string;
                building?: string;
                street?: string;
                locality?: string;
                ward?: string;
                city?: string;
                state?: string;
                country?: string;
                area_code?: string;
            };
            station_code?: string;
            city?: {
                name?: string;
                code?: string;
            };
            country?: {
                name?: string;
                code?: string;
            };
            circle?: {
                gps: string;
                radius: {
                    type?: "CONSTANT" | "VARIABLE";
                    value?: string;
                    estimated_value?: string;
                    computed_value?: string;
                    range?: {
                        min?: string;
                        max?: string;
                    };
                    unit?: string;
                };
            };
            polygon?: string;
            '3dspace'?: string;
            time?: {
                label?: string;
                timestamp?: string;
                duration?: string;
                range?: {
                    start?: string;
                    end?: string;
                };
                days?: string;
                schedule?: {
                    frequency?: string;
                    holidays?: string[];
                    times?: string[];
                };
            };
        } & {
            rateable?: boolean;
        })[];
        offers?: {
            id?: string;
            descriptor?: {
                name?: string;
                code?: string;
                symbol?: string;
                short_desc?: string;
                long_desc?: string;
                additional_desc?: {
                    url: string;
                    content_type: string;
                };
                operation?: string;
                images?: {
                    url: string;
                    size_type?: string;
                }[];
                audio?: string;
                video?: string;
                '3d_render'?: string;
            };
            location_ids?: string[];
            category_ids?: string[];
            item_ids?: string[];
            time?: {
                label?: string;
                timestamp?: string;
                duration?: string;
                range?: {
                    start?: string;
                    end?: string;
                };
                days?: string;
                schedule?: {
                    frequency?: string;
                    holidays?: string[];
                    times?: string[];
                };
            };
        }[];
        items?: {
            id?: string;
            parent_item_id?: string;
            descriptor?: {
                name?: string;
                code?: string;
                symbol?: string;
                short_desc?: string;
                long_desc?: string;
                additional_desc?: {
                    url: string;
                    content_type: string;
                };
                operation?: string;
                images?: {
                    url: string;
                    size_type?: string;
                }[];
                audio?: string;
                video?: string;
                '3d_render'?: string;
            };
            price?: {
                currency?: string;
                value?: string;
                estimated_value?: string;
                computed_value?: string;
                listed_value?: string;
                offered_value?: string;
                minimum_value?: string;
                maximum_value?: string;
            };
            quantity?: {
                allocated?: {
                    count?: number;
                    measure?: {
                        type?: "CONSTANT" | "VARIABLE";
                        value?: string;
                        estimated_value?: string;
                        computed_value?: string;
                        range?: {
                            min?: string;
                            max?: string;
                        };
                        unit?: string;
                    };
                };
                available?: {
                    count?: number;
                    measure?: {
                        type?: "CONSTANT" | "VARIABLE";
                        value?: string;
                        estimated_value?: string;
                        computed_value?: string;
                        range?: {
                            min?: string;
                            max?: string;
                        };
                        unit?: string;
                    };
                };
                maximum?: {
                    count?: number;
                    measure?: {
                        type?: "CONSTANT" | "VARIABLE";
                        value?: string;
                        estimated_value?: string;
                        computed_value?: string;
                        range?: {
                            min?: string;
                            max?: string;
                        };
                        unit?: string;
                    };
                };
                minimum?: {
                    count?: number;
                    measure?: {
                        type?: "CONSTANT" | "VARIABLE";
                        value?: string;
                        estimated_value?: string;
                        computed_value?: string;
                        range?: {
                            min?: string;
                            max?: string;
                        };
                        unit?: string;
                    };
                };
                selected?: {
                    count?: number;
                    measure?: {
                        type?: "CONSTANT" | "VARIABLE";
                        value?: string;
                        estimated_value?: string;
                        computed_value?: string;
                        range?: {
                            min?: string;
                            max?: string;
                        };
                        unit?: string;
                    };
                };
            };
            category_ids?: string[];
            fulfillment_ids?: string[];
            rating?: string;
            location_ids?: string[];
            payment_id?: string;
            time?: {
                label?: string;
                timestamp?: string;
                duration?: string;
                range?: {
                    start?: string;
                    end?: string;
                };
                days?: string;
                schedule?: {
                    frequency?: string;
                    holidays?: string[];
                    times?: string[];
                };
            };
            rateable?: boolean;
            matched?: boolean;
            related?: boolean;
            recommended?: boolean;
            tags?: {
                descriptor?: {
                    name?: string;
                    code?: string;
                    symbol?: string;
                    short_desc?: string;
                    long_desc?: string;
                    additional_desc?: {
                        url: string;
                        content_type: string;
                    };
                    operation?: string;
                    images?: {
                        url: string;
                        size_type?: string;
                    }[];
                    audio?: string;
                    video?: string;
                    '3d_render'?: string;
                };
                list?: {
                    descriptor?: {
                        name?: string;
                        code?: string;
                        symbol?: string;
                        short_desc?: string;
                        long_desc?: string;
                        additional_desc?: {
                            url: string;
                            content_type: string;
                        };
                        operation?: string;
                        images?: {
                            url: string;
                            size_type?: string;
                        }[];
                        audio?: string;
                        video?: string;
                        '3d_render'?: string;
                    };
                    value?: string;
                }[];
            }[];
        }[];
        exp?: string;
        rateable?: boolean;
        tags?: {
            descriptor?: {
                name?: string;
                code?: string;
                symbol?: string;
                short_desc?: string;
                long_desc?: string;
                additional_desc?: {
                    url: string;
                    content_type: string;
                };
                operation?: string;
                images?: {
                    url: string;
                    size_type?: string;
                }[];
                audio?: string;
                video?: string;
                '3d_render'?: string;
            };
            list?: {
                descriptor?: {
                    name?: string;
                    code?: string;
                    symbol?: string;
                    short_desc?: string;
                    long_desc?: string;
                    additional_desc?: {
                        url: string;
                        content_type: string;
                    };
                    operation?: string;
                    images?: {
                        url: string;
                        size_type?: string;
                    }[];
                    audio?: string;
                    video?: string;
                    '3d_render'?: string;
                };
                value?: string;
            }[];
        }[];
    };
    items: {
        id?: string;
        parent_item_id?: string;
        descriptor?: {
            name?: string;
            code?: string;
            symbol?: string;
            short_desc?: string;
            long_desc?: string;
            additional_desc?: {
                url: string;
                content_type: string;
            };
            operation?: string;
            images?: {
                url: string;
                size_type?: string;
            }[];
            audio?: string;
            video?: string;
            '3d_render'?: string;
        };
        price?: {
            currency?: string;
            value?: string;
            estimated_value?: string;
            computed_value?: string;
            listed_value?: string;
            offered_value?: string;
            minimum_value?: string;
            maximum_value?: string;
        };
        quantity?: {
            allocated?: {
                count?: number;
                measure?: {
                    type?: "CONSTANT" | "VARIABLE";
                    value?: string;
                    estimated_value?: string;
                    computed_value?: string;
                    range?: {
                        min?: string;
                        max?: string;
                    };
                    unit?: string;
                };
            };
            available?: {
                count?: number;
                measure?: {
                    type?: "CONSTANT" | "VARIABLE";
                    value?: string;
                    estimated_value?: string;
                    computed_value?: string;
                    range?: {
                        min?: string;
                        max?: string;
                    };
                    unit?: string;
                };
            };
            maximum?: {
                count?: number;
                measure?: {
                    type?: "CONSTANT" | "VARIABLE";
                    value?: string;
                    estimated_value?: string;
                    computed_value?: string;
                    range?: {
                        min?: string;
                        max?: string;
                    };
                    unit?: string;
                };
            };
            minimum?: {
                count?: number;
                measure?: {
                    type?: "CONSTANT" | "VARIABLE";
                    value?: string;
                    estimated_value?: string;
                    computed_value?: string;
                    range?: {
                        min?: string;
                        max?: string;
                    };
                    unit?: string;
                };
            };
            selected?: {
                count?: number;
                measure?: {
                    type?: "CONSTANT" | "VARIABLE";
                    value?: string;
                    estimated_value?: string;
                    computed_value?: string;
                    range?: {
                        min?: string;
                        max?: string;
                    };
                    unit?: string;
                };
            };
        };
        category_ids?: string[];
        fulfillment_ids?: string[];
        rating?: string;
        location_ids?: string[];
        payment_id?: string;
        time?: {
            label?: string;
            timestamp?: string;
            duration?: string;
            range?: {
                start?: string;
                end?: string;
            };
            days?: string;
            schedule?: {
                frequency?: string;
                holidays?: string[];
                times?: string[];
            };
        };
        rateable?: boolean;
        matched?: boolean;
        related?: boolean;
        recommended?: boolean;
        tags?: {
            descriptor?: {
                name?: string;
                code?: string;
                symbol?: string;
                short_desc?: string;
                long_desc?: string;
                additional_desc?: {
                    url: string;
                    content_type: string;
                };
                operation?: string;
                images?: {
                    url: string;
                    size_type?: string;
                }[];
                audio?: string;
                video?: string;
                '3d_render'?: string;
            };
            list?: {
                descriptor?: {
                    name?: string;
                    code?: string;
                    symbol?: string;
                    short_desc?: string;
                    long_desc?: string;
                    additional_desc?: {
                        url: string;
                        content_type: string;
                    };
                    operation?: string;
                    images?: {
                        url: string;
                        size_type?: string;
                    }[];
                    audio?: string;
                    video?: string;
                    '3d_render'?: string;
                };
                value?: string;
            }[];
        }[];
    }[];
    quote: {
        price?: {
            currency?: string;
            value?: string;
            estimated_value?: string;
            computed_value?: string;
            listed_value?: string;
            offered_value?: string;
            minimum_value?: string;
            maximum_value?: string;
        };
        breakup?: {
            title?: string;
            price?: {
                currency?: string;
                value?: string;
                estimated_value?: string;
                computed_value?: string;
                listed_value?: string;
                offered_value?: string;
                minimum_value?: string;
                maximum_value?: string;
            };
        }[];
        ttl?: string;
    };
};
export declare const generateOrder: (action: string, message_id: string, item: any, providerId: string, providerDescriptor: any, categoryId: string) => {
    id: string;
    ref_order_ids: any[];
    state: string;
    type: string;
    provider: {
        id: string;
        descriptor: any;
        category_id: string;
    };
    items: any[];
    fulfillments: {
        id: string;
        type: string;
        tracking: boolean;
        customer: {};
        agent: {};
        contact: {};
    };
    created_at: Date;
    updated_at: Date;
    tags: {
        display: boolean;
        name: string;
        list: {
            name: string;
            value: string;
            display: boolean;
        }[];
    }[];
};
export declare const selectItemMapper1: (item: any) => {
    provider: {
        id: string;
        descriptor: {
            name: string;
        };
    };
    items: {
        id: string;
        parent_item_id: string;
        descriptor: {
            name: any;
            long_desc: any;
        };
        price: {
            currency: string;
            value: string;
        };
        category_id: any;
        recommended: boolean;
        rating: string;
        tags: {
            name: string;
            list: {
                name: string;
                value: any;
            }[];
        }[];
        rateable: boolean;
    }[];
};
export declare const selectItemMapper: (item: any) => {
    provider: {
        id: string;
        descriptor: {
            name: string;
            short_desc: string;
            images: {
                url: string;
            }[];
        };
        categories: {
            id: string;
            descriptor: {
                code: string;
                name: string;
            };
        }[];
    };
    items: {
        id: string;
        quantity: {
            maximum: {
                count: number;
            };
        };
        parent_item_id: string;
        descriptor: {
            name: any;
            short_desc: string;
            long_desc: any;
            images: {
                url: string;
            }[];
            media: any[];
        };
        creator: {
            descriptor: {
                name: string;
                short_desc: string;
                long_desc: string;
                images: any[];
            };
        };
        price: {
            currency: string;
            value: string;
        };
        category_ids: string[];
        rating: string;
        rateable: boolean;
        tags: {
            descriptor: {
                code: string;
                name: string;
            };
            list: {
                descriptor: {
                    code: string;
                    name: string;
                };
                value: any;
            }[];
            display: boolean;
        }[];
    }[];
    fulfillments: {
        agent: {
            person: {
                name: string;
            };
            contact: {
                email: string;
            };
        };
    }[];
};
export declare const confirmItemMapper: (item: any) => {
    id: string;
    provider: {
        id: string;
        descriptor: {
            name: string;
            short_desc: string;
            images: {
                url: string;
            }[];
        };
        categories: {
            id: string;
            descriptor: {
                code: string;
                name: string;
            };
        }[];
    };
    items: {
        id: string;
        quantity: {
            maximum: {
                count: number;
            };
        };
        descriptor: {
            name: string;
            short_desc: string;
            long_desc: string;
            images: any[];
            media: {
                url: string;
            }[];
        };
        creator: {
            descriptor: {
                name: string;
                short_desc: string;
                long_desc: string;
                images: any[];
            };
        };
        price: {
            currency: string;
            value: string;
        };
        category_ids: string[];
        rating: string;
        rateable: boolean;
        add_ons: {
            id: string;
            descriptor: {
                name: string;
                long_desc: string;
                media: any[];
            };
        }[];
        tags: {
            descriptor: {
                code: string;
                name: string;
            };
            list: {
                descriptor: {
                    code: string;
                    name: string;
                };
                value: any;
            }[];
            display: boolean;
        }[];
    }[];
    fulfillments: ({
        state: {
            descriptor: {
                code: string;
                name: string;
            };
            updated_at: Date;
        };
        agent?: undefined;
        customer?: undefined;
        stops?: undefined;
        tags?: undefined;
    } | {
        agent: {
            person: {
                name: string;
            };
            contact: {
                email: string;
            };
        };
        customer: {
            person: {
                name: any;
                age: any;
                gender: any;
            };
            contact: {
                phone: any;
                email: any;
            };
        };
        stops: {
            id: string;
            instructions: {
                name: string;
                long_desc: string;
                media: any[];
            };
        }[];
        tags: {
            descriptor: {
                code: string;
                name: string;
            };
            list: {
                descriptor: {
                    code: string;
                    name: string;
                };
                value: string;
            }[];
            display: boolean;
        }[];
        state?: undefined;
    })[];
    quote: {
        price: {
            currency: string;
            value: string;
        };
    };
    payments: {
        params: {
            amount: string;
            currency: string;
        };
        type: string;
        status: string;
        collected_by: string;
    }[];
};
export declare const averageRating: (data: any) => number;
export declare const feedback: (data: any) => {
    ratingValues: any[];
    feedbacks: any[];
};
