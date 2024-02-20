
export const createServicioTransporteMsg = (phone: string, data: ServTransModel): ServicioTransporteTemplate => {
    return {
        messaging_product: 'whatsapp',
        to: phone,
        type: 'template',
        template: {
            name: 'servicio_transporte',
            language: {
                code: 'es'
            },
            components: [
                {
                    type: 'header',
                    parameters: [
                        {
                            type: 'image',
                            image: {
                                link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Optimusprimealtmoviemode.jpg/1200px-Optimusprimealtmoviemode.jpg'
                            }
                        }
                    ]
                },
                {
                    type: 'body',
                    parameters: [
                        {
                            type: 'text',
                            text: 'Jenny Martinez Geronimo'
                        }
                    ]
                },
            ]
        }
    };
}

export interface ServTransModel {
    headerParam: ImageModel;
    bodyAparams: Array<TextModel>;
}

export interface ImageModel {
    type: 'link' | 'id';
    source: string;
}

export interface TextModel {
    index: number;
    text: string;
}

interface ServicioTransporteTemplate {
    messaging_product: string;
    to: string;
    type: 'template';
    template: {
        name: string;
        language: {
            code: string;
        }
        components: Array<{
            type: 'header' | 'body';
            parameters: [
                {
                    type: eParamType;
                    audio?: eMedia,
                    document?: eMedia,
                    image?: eMedia,
                    video?: eMedia,
                    text?: string;
                }
            ]
        }>;
    }
}

type eMediaType = 'audio' | 'document' | 'image' | 'sticker' | 'video ';
type eParamType = eMediaType | 'text';

type eMedia = {
    id?: string;
    link?: string;
    caption?: string;
    filename?: string;
}