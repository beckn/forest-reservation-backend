export interface paths {
    '/search': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message: {
                            intent?: components['schemas']['Intent'];
                        };
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                                catalog?: null;
                                $ref?: components['schemas']['Catalog'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/select': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message: {
                            order: components['schemas']['Order'];
                        };
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/init': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message: {
                            order: components['schemas']['Order'];
                        };
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/confirm': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message: {
                            order: components['schemas']['Order'];
                        };
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/cancel': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message: {
                            order_id: components['schemas']['Order']['id'];
                            cancellation_reason_id?: components['schemas']['Option']['id'];
                            descriptor?: components['schemas']['Descriptor'];
                        };
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/update': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message: {
                            update_target: string;
                            order: components['schemas']['Order'];
                        };
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/rating': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message: components['schemas']['Rating'];
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/support': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message: {
                            phone?: string;
                            email?: string;
                            ref_id?: string;
                        };
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/on_search': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message?: {
                            catalog: components['schemas']['Catalog'];
                        };
                        error?: components['schemas']['Error'];
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message?: {
                                ack: components['schemas']['Ack'];
                                catalog?: null;
                                $ref?: components['schemas']['Catalog'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/on_select': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message?: {
                            order?: components['schemas']['Order'];
                        };
                        error?: components['schemas']['Error'];
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/on_init': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message?: {
                            order: components['schemas']['Order'];
                        };
                        error?: components['schemas']['Error'];
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/on_confirm': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message?: {
                            order: components['schemas']['Order'];
                        };
                        error?: components['schemas']['Error'];
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/on_cancel': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message?: {
                            order_id: components['schemas']['Order']['id'];
                            cancellation_reason_id?: components['schemas']['Option']['id'];
                            descriptor?: components['schemas']['Descriptor'];
                        };
                        error?: components['schemas']['Error'];
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/on_update': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message?: {
                            update_target?: string;
                            order: components['schemas']['Order'];
                        };
                        error?: components['schemas']['Error'];
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/on_rating': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message?: components['schemas']['Rating'];
                        error?: components['schemas']['Error'];
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
    '/on_support': {
        post: {
            requestBody?: {
                content: {
                    'application/json': {
                        context: components['schemas']['Context'];
                        message?: {
                            phone?: string;
                            email?: string;
                            ref_id?: string;
                        };
                        error?: components['schemas']['Error'];
                    };
                };
            };
            responses: {
                200: {
                    content: {
                        'application/json': {
                            message: {
                                ack: components['schemas']['Ack'];
                            };
                            error?: components['schemas']['Error'];
                        };
                    };
                };
            };
        };
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Ack: {
            status: 'ACK' | 'NACK';
        };
        AddOn: {
            id?: string;
            descriptor?: components['schemas']['Descriptor'];
            price?: components['schemas']['Price'];
        };
        Address: {
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
        Agent: components['schemas']['Person'] & components['schemas']['Contact'] & {
            rateable?: components['schemas']['Rateable'];
        };
        Authorization: {
            type?: string;
            token?: string;
            valid_from?: string;
            valid_to?: string;
            status?: string;
        };
        Billing: {
            name?: string;
            organization?: components['schemas']['Organization'];
            address?: components['schemas']['Address'];
            email?: string;
            phone?: string;
            time?: components['schemas']['Time'];
            tax_number?: string;
            created_at?: string;
            updated_at?: string;
        };
        Cancellation: {
            type?: 'full' | 'partial';
            ref_id?: string;
            policies?: components['schemas']['Policy'][];
            time?: string;
            cancelled_by?: string;
            reasons?: components['schemas']['Option'];
            selected_reason?: {
                id?: components['schemas']['Option']['id'];
            };
            additional_description?: components['schemas']['Descriptor'];
        };
        CancellationTerms: {
            cancel_by?: string;
            refund_eligible?: boolean;
            refund_percentage?: number;
            other_terms?: string[];
        };
        CargoItem: {
            descriptor?: components['schemas']['Descriptor'];
            dimensions?: components['schemas']['Dimensions'];
        };
        Catalog: {
            'bpp/descriptor'?: components['schemas']['Descriptor'];
            'bpp/categories'?: components['schemas']['Category'][];
            'bpp/fulfillments'?: components['schemas']['Fulfillment'][];
            'bpp/payments'?: components['schemas']['Payment'][];
            'bpp/offers'?: components['schemas']['Offer'][];
            'bpp/providers'?: components['schemas']['Provider'][];
            exp?: string;
        };
        Category: {
            id?: string;
            parent_category_id?: components['schemas']['Category']['id'];
            descriptor?: components['schemas']['Descriptor'];
            time?: components['schemas']['Time'];
            tags?: components['schemas']['Tags'];
        };
        Circle: {
            gps: components['schemas']['Gps'];
            radius: components['schemas']['Scalar'];
        };
        City: {
            name?: string;
            code?: string;
        };
        Contact: {
            name?: components['schemas']['Name'];
            address?: components['schemas']['Address'];
            phone?: string;
            email?: string;
            jcard?: Record<string, never>;
            tags?: components['schemas']['Tags'];
        };
        Context: {
            domain: components['schemas']['Domain'];
            country: components['schemas']['Country']['code'];
            city: components['schemas']['City']['code'];
            action: 'search' | 'select' | 'init' | 'confirm' | 'update' | 'status' | 'track' | 'cancel' | 'rating' | 'support' | 'on_search' | 'on_select' | 'on_init' | 'on_confirm' | 'on_update' | 'on_status' | 'on_track' | 'on_cancel' | 'on_rating' | 'on_support';
            core_version: string;
            bap_id: string;
            bap_uri: string;
            bpp_id?: string;
            bpp_uri?: string;
            transaction_id: string;
            message_id: string;
            timestamp: string;
            key?: string;
            ttl?: string;
        };
        Country: {
            name?: string;
            code?: string;
        };
        Credential: {
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
        };
        DecimalValue: string;
        Descriptor: {
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
            images?: components['schemas']['Image'][];
            audio?: string;
            video?: string;
            '3d_render'?: string;
        };
        Dimensions: {
            length?: components['schemas']['Scalar'];
            breadth?: components['schemas']['Scalar'];
            height?: components['schemas']['Scalar'];
        };
        Document: {
            url?: string;
            label?: string;
        };
        Domain: string;
        Duration: string;
        Error: {
            type: 'CONTEXT-ERROR' | 'CORE-ERROR' | 'DOMAIN-ERROR' | 'POLICY-ERROR' | 'JSON-SCHEMA-ERROR';
            code: string;
            path?: string;
            message?: string;
        };
        Feedback: {
            feedback_form?: components['schemas']['FeedbackForm'];
            feedback_url?: components['schemas']['FeedbackUrl'];
        };
        FeedbackForm: components['schemas']['FeedbackFormElement'][];
        FeedbackFormElement: {
            id?: string;
            parent_id?: components['schemas']['FeedbackFormElement']['id'];
            question?: string;
            answer?: string;
            answer_type?: 'radio' | 'checkbox' | 'text';
        };
        FeedbackUrl: {
            url?: string;
            tl_method?: 'http/get' | 'http/post';
            params?: {
                feedback_id: string;
                [key: string]: string | undefined;
            };
        };
        Fulfillment: {
            id?: string;
            type?: string;
            provider_id?: components['schemas']['Provider']['id'];
            rating?: components['schemas']['Rating']['value'];
            state?: components['schemas']['State'];
            tracking?: boolean;
            customer?: {
                person?: components['schemas']['Person'];
                contact?: components['schemas']['Contact'];
            };
            agent?: components['schemas']['Agent'];
            person?: components['schemas']['Person'];
            contact?: components['schemas']['Contact'];
            vehicle?: components['schemas']['Vehicle'];
            start?: {
                location?: components['schemas']['Location'];
                time?: components['schemas']['Time'];
                instructions?: components['schemas']['Descriptor'];
                contact?: components['schemas']['Contact'];
                person?: components['schemas']['Person'];
                authorization?: components['schemas']['Authorization'];
            };
            end?: {
                location?: components['schemas']['Location'];
                time?: components['schemas']['Time'];
                instructions?: components['schemas']['Descriptor'];
                contact?: components['schemas']['Contact'];
                person?: components['schemas']['Person'];
                authorization?: components['schemas']['Authorization'];
            };
            rateable?: components['schemas']['Rateable'];
            tags?: components['schemas']['Tags'][];
            stops?: components['schemas']['Stop'][];
        };
        Gps: string;
        Image: {
            url: string;
            size_type?: string;
        };
        Stop: {
            type: string;
            instructions: {
                short_desc: string;
            };
        };
        Intent: {
            descriptor?: components['schemas']['Descriptor'];
            provider?: components['schemas']['Provider'];
            fulfillment?: components['schemas']['Fulfillment'];
            payment?: components['schemas']['Payment'];
            category?: components['schemas']['Category'];
            offer?: components['schemas']['Offer'];
            item?: components['schemas']['Item'];
            tags?: components['schemas']['Tags'];
        };
        ItemQuantity: {
            allocated?: {
                count?: number;
                measure?: components['schemas']['Scalar'];
            };
            available?: {
                count?: number;
                measure?: components['schemas']['Scalar'];
            };
            maximum?: {
                count?: number;
                measure?: components['schemas']['Scalar'];
            };
            minimum?: {
                count?: number;
                measure?: components['schemas']['Scalar'];
            };
            selected?: {
                count?: number;
                measure?: components['schemas']['Scalar'];
            };
        };
        Item: {
            id?: string;
            parent_item_id?: components['schemas']['Item']['id'];
            descriptor?: components['schemas']['Descriptor'];
            price?: components['schemas']['Price'];
            quantity?: components['schemas']['ItemQuantity'];
            category_ids?: string[];
            fulfillment_ids?: string[];
            rating?: components['schemas']['Rating']['value'];
            location_ids?: string[];
            payment_id?: components['schemas']['Payment']['id'];
            time?: components['schemas']['Time'];
            rateable?: components['schemas']['Rateable'];
            matched?: boolean;
            related?: boolean;
            recommended?: boolean;
            tags?: components['schemas']['Tags'][];
        };
        Language: {
            code?: string;
        };
        Location: {
            id?: string;
            descriptor?: components['schemas']['Descriptor'];
            gps?: components['schemas']['Gps'];
            address?: components['schemas']['Address'];
            station_code?: string;
            city?: components['schemas']['City'];
            country?: components['schemas']['Country'];
            circle?: components['schemas']['Circle'];
            polygon?: string;
            '3dspace'?: string;
            time?: components['schemas']['Time'];
        };
        Organization: {
            descriptor?: components['schemas']['Descriptor'];
            address?: components['schemas']['Address'];
            contact?: components['schemas']['Contact'];
        };
        Name: string;
        Offer: {
            id?: string;
            descriptor?: components['schemas']['Descriptor'];
            location_ids?: components['schemas']['Location']['id'][];
            category_ids?: components['schemas']['Category']['id'][];
            item_ids?: components['schemas']['Item']['id'][];
            time?: components['schemas']['Time'];
        };
        Operator: components['schemas']['Person'] & {
            experience?: {
                label?: string;
                value?: string;
                unit?: string;
            };
        };
        Option: {
            id?: string;
            descriptor?: components['schemas']['Descriptor'];
        };
        Order: {
            id?: string;
            state?: string;
            provider?: components['schemas']['Provider'];
            items?: components['schemas']['Item'][];
            add_ons?: components['schemas']['AddOn'][];
            offers?: components['schemas']['Offer'][];
            documents?: components['schemas']['Document'][];
            billing?: components['schemas']['Billing'];
            fulfillments?: components['schemas']['Fulfillment'][];
            return_terms?: components['schemas']['ReturnTerms'];
            update_terms?: components['schemas']['UpdateTerms'];
            quote?: components['schemas']['Quotation'];
            payment?: components['schemas']['Payment'];
            created_at?: string;
            updated_at?: string;
        };
        Page: {
            id?: string;
            next_id?: string;
        };
        Payload: {
            persons?: {
                count?: string;
                list?: Record<string, never>;
            };
            cargo?: {
                count?: string;
                list?: Record<string, never>;
            };
        };
        Payment: {
            id?: string;
            uri?: string;
            params?: {
                transaction_id?: string;
                transaction_status?: string;
                amount?: components['schemas']['Price']['value'];
                currency?: components['schemas']['Price']['currency'];
                bank_code?: string;
                bank_account_number?: string;
                virtual_payment_address?: string;
            };
            type?: 'ON-ORDER' | 'PRE-FULFILLMENT' | 'ON-FULFILLMENT' | 'POST-FULFILLMENT';
            status?: 'PAID' | 'NOT-PAID';
            time?: components['schemas']['Time'];
        };
        Person: {
            id?: string;
            name?: components['schemas']['Name'];
            image?: components['schemas']['Image'];
            dob?: string;
            gender?: string;
            creds?: components['schemas']['Credential'][];
            tags?: components['schemas']['Tags'];
        };
        Policy: {
            id?: string;
            descriptor?: components['schemas']['Descriptor'];
            parent_policy_id?: components['schemas']['Policy']['id'];
            time?: components['schemas']['Time'];
        };
        Price: {
            currency?: string;
            value?: components['schemas']['DecimalValue'];
            estimated_value?: components['schemas']['DecimalValue'];
            computed_value?: components['schemas']['DecimalValue'];
            listed_value?: components['schemas']['DecimalValue'];
            offered_value?: components['schemas']['DecimalValue'];
            minimum_value?: components['schemas']['DecimalValue'];
            maximum_value?: components['schemas']['DecimalValue'];
        };
        Provider: {
            id?: string;
            descriptor?: components['schemas']['Descriptor'];
            category_id?: string;
            rating?: components['schemas']['Rating']['value'];
            time?: components['schemas']['Time'];
            categories?: components['schemas']['Category'][];
            fulfillments?: components['schemas']['Fulfillment'][];
            payments?: components['schemas']['Payment'][];
            locations?: (components['schemas']['Location'] & {
                rateable?: components['schemas']['Rateable'];
            })[];
            offers?: components['schemas']['Offer'][];
            items?: components['schemas']['Item'][];
            exp?: string;
            rateable?: components['schemas']['Rateable'];
            tags?: components['schemas']['Tags'][];
        };
        Quotation: {
            price?: components['schemas']['Price'];
            breakup?: {
                title?: string;
                price?: components['schemas']['Price'];
            }[];
            ttl?: components['schemas']['Duration'];
        };
        Rateable: boolean;
        Rating: {
            rating_category?: string;
            id?: string;
            value?: string;
        };
        RatingAck: {
            rating_ack?: boolean;
            feedback_ack?: boolean;
            feedback_url?: string;
        };
        ReplacementTerms: {
            replace_by?: string;
            replacement_eligible?: boolean;
            other_terms?: string[];
        };
        ReturnTerms: {
            return_by?: string;
            refund_eligible?: boolean;
            refund_percentage?: number;
            other_terms?: string[];
        };
        Scalar: {
            type?: 'CONSTANT' | 'VARIABLE';
            value?: components['schemas']['DecimalValue'];
            estimated_value?: components['schemas']['DecimalValue'];
            computed_value?: components['schemas']['DecimalValue'];
            range?: {
                min?: components['schemas']['DecimalValue'];
                max?: components['schemas']['DecimalValue'];
            };
            unit?: string;
        };
        Schedule: {
            frequency?: components['schemas']['Duration'];
            holidays?: string[];
            times?: string[];
        };
        State: {
            descriptor?: components['schemas']['Descriptor'];
            updated_at?: string;
            updated_by?: string;
        };
        Subscriber: {
            subscriber_id?: string;
            type?: 'bap' | 'bpp' | 'bg' | 'bppr' | 'bgr';
            cb_url?: string;
            domain?: components['schemas']['Domain'];
            city?: components['schemas']['City']['code'];
            country?: components['schemas']['Country']['code'];
            signing_public_key?: string;
            encryption_public_key?: string;
            status?: 'INITIATED' | 'UNDER_SUBSCRIPTION' | 'SUBSCRIBED' | 'INVALID_SSL' | 'UNSUBSCRIBED';
            created?: string;
            updated?: string;
            expires?: string;
        };
        Support: {
            type?: 'order' | 'billing' | 'fulfillment';
            ref_id?: string;
            channels?: components['schemas']['Tags'];
        };
        Tags: {
            descriptor?: components['schemas']['Descriptor'];
            list?: components['schemas']['list'][];
        };
        list: {
            descriptor?: components['schemas']['Descriptor'];
            value?: string;
        };
        Time: {
            label?: string;
            timestamp?: string;
            duration?: components['schemas']['Duration'];
            range?: {
                start?: string;
                end?: string;
            };
            days?: string;
            schedule?: components['schemas']['Schedule'];
        };
        TrackingData: components['schemas']['Location']['gps'];
        Tracking: {
            url?: string;
            status?: 'active' | 'inactive';
        };
        UpdateTerms: {
            update_by?: string;
            other_terms?: string[];
        };
        Vehicle: {
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
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type external = Record<string, never>;
export type operations = Record<string, never>;
