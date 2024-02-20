
export const ServiciosTransporteMessage = {
    json: {
        messaging_product: 'whatsapp',
        to: 'PARAM_PHONE_1',
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
                                link: 'PARM_IMAGE_1'
                            }
                        }
                    ]
                }, {
                    type: 'body',
                    parameters: [
                        {
                            type: 'text',
                            text: 'PARAM_TEXT1'
                        },
                        {
                            type: 'text',
                            text: 'PARAM_TEXT2'
                        },
                        {
                            type: 'text',
                            text: 'PARAM_TEXT3'
                        },
                        {
                            type: 'text',
                            text: 'PARAM_TEXT4'
                        },
                        {
                            type: 'text',
                            text: 'PARAM_TEXT5'
                        },
                        {
                            type: 'text',
                            text: 'PARAM_TEXT6'
                        },
                        {
                            type: 'text',
                            text: 'PARAM_TEXT7'
                        }, {
                            type: 'text',
                            text: 'PARAM_TEXT8'
                        }
                    ]
                }
            ]
        }
    },
    schema: {
        schema: "https://json-schema.org/draft/2020-12/schema",
        id: "https://example.com/product.schema.json",
        title: "Plantilla",
        type: "object",
        defs: {
            component: {
                anchor: 'ComponentSchema',
                type: 'object'
            }
        },
        properties: {
            messaging_product: {
                description: 'Descripcion del producto',
                enum: ['whatsapp']
            },
            to: {
                description: 'Numero Telefonico de Destino',
                type: 'string'
            },
            type: {
                description: 'Tipo de Elemento',
                enum: ['template']
            },
            template: {
                description: 'Plantilla',
                type: 'object',
                properties: {
                    name: {
                        description: 'Nombre de la Plantilla',
                        type: 'string'
                    },
                    language: {
                        description: 'Lenguaje de la Plantilla',
                        type: 'object',
                        properties: {
                            code: {
                                description: 'Codigo de lenguaje',
                                enum: ['es']
                            },
                        }
                    },
                    components: {
                        description: 'Componentes de la Plantilla',
                        type: 'array',
                        minItems: 1,
                        uniqueItems: true,
                        items: {
                            type: 'object',
                            properties: {
                                type: {
                                    description: 'Tipo de Componente',
                                    enum: ['header', 'body']
                                },
                                parameters: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            type: {
                                                description: 'Tipo de Parametro',
                                                enum: ['image', 'text']
                                            },
                                            text: {
                                                description: 'Valor para el tipo texto',
                                                type: 'string'
                                            },
                                            image: {
                                                description: 'Valor para el tipo image',
                                                type: 'object',
                                                properties: {
                                                    link: {
                                                        description: 'Url de la imagen',
                                                        type: 'string'
                                                    },
                                                    id: {
                                                        description: 'id de la imagen',
                                                        type: 'string'
                                                    },
                                                    caption: {
                                                        description: 'etiqueta de la imagen',
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
            }
        }
    }
}