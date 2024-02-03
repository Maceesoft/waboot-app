

export const createCitaMessage = (phone: string, appoint: number): Message => {
    return {
        type: 'template',
        to: phone,
        template: {
            name: '',
            language: {
                code: 'es'
            },
            components: [
                {
                    type: 'body',
                    parameters: [
                        {
                            type: 'text',
                            text: '11-ene-2024 10:30AM'
                        },
                        {
                            type: 'text',
                            text: '11-ene-2024 05:30PM'
                        }
                    ]
                }, {
                    type: 'button',
                    sub_type: 'quick_reply',
                    index: '0',
                    parameters: [
                        {
                            type: 'payload',
                            payload: `${appoint}${3}`
                        }
                    ]
                },
                {
                    type: 'button',
                    sub_type: 'quick_reply',
                    index: '1',
                    parameters: [
                        {
                            type: 'payload',
                            payload: `${appoint}${2}`
                        }
                    ]
                }
            ],
        }
    }
}

export interface Message {
    type: 'text' | 'image' | 'audio' | 'document' | 'template' | 'hsm'
    to: string;
    recipient_type?: string;
    messaging_product?: string;
    template?: Template;
    text?: Text;
    media?: Media;
    reaction?: Reaction;
    location?: Location;
    contacts?: Array<Contact>;
    interactive?: Interactive;
}

export interface Template {
    namespace?: string;
    name: string;
    language: language;
    components?: Array<Component>
}

export interface language {
    code: string;
}

export interface Component {
    type: 'header' | 'body' | 'footer' | 'button';
    sub_type?: string;
    index?: string;
    parameters: Array<Parameter | ParameterPayload>;
}

export interface Reaction {
    message_id: string;
    emoji: string;
}

export interface ParameterPayload {
    type: 'payload';
    payload: string;
}

export interface Parameter {
    type: 'currency' | 'date_time' | 'document' | 'image' | 'text' | 'video',
    text?: string;
    currency?: Currency;
    date_time?: Date_Time;
    image?: Media;
    document?: Media;
    video?: Media;
}

export interface Location {
    longitude: string;
    latitude: string;
    name: string;
    address: string;
}

export interface Text {
    body?: string;
    preview_url?: string;
}

export interface Media {
    id?: string;
    link?: string;
    caption?: string;
    filename?: string;
    provider?: string;
}

export interface Date_Time {
    fallback_value: string;
}

export interface Currency {
    fallback_value: string;
    code: string;
    amount_1000: string;
}

export interface Contact {
    addresses?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
        country_code?: string;
        type?: string;
    },
    birthday?: string;
    emails?: {
        email?: string;
        type?: string;
    },
    name: {
        formatted_name: string;
        first_name: string;
        last_name: string;
        middle_name: string;
        suffix: string;
        prefix: string;
    },
    org?: {
        company?: string;
        department?: string;
        title?: string;
    },
    phones?: {
        phone?: string;
        type?: string;
        wa_id?: string;
    },
    urls?: {
        url?: string;
        type?: string;
    }
}

export interface Interactive {
    action: {
        button?: string;
        buttons?: Array<{ type: string, title: string, id: string }>,
        catalog_id?: string;
        product_retailer_id?: string;
        sections?: Array<Section>;
        mode?: 'draft' | 'published';
        flow_message_version?: string;
        flow_token: string;
        flow_id?: string;
        flow_action?: string;
        flow_action_payload?: string;
    }
    body?: Body;
    footer?: Footer;
    header?: Header;
    type: 'button' | 'catalog_message' | 'list' | 'product' | 'product_list' | 'flow';
}

export interface Footer {
    text: string;
}

export interface Header {
    document?: Document;
    image?: Media;
    text?: string;
    type: 'text' | 'video' | 'image' | 'document'
}

export interface Section {
    product_items?: Array<{ product_retailer_id: string }>;
    rows?: Array<{ id: string, title: string, description?: string }>
}