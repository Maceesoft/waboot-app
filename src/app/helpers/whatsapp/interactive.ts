
export const createInteractiveMsg = (phone: string, opts: Interactive): MsgInteractive => {
    return {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        type: 'interactive',
        to: phone,
        interactive: opts
    };
};

export interface MsgInteractive {
    messaging_product: string;
    recipient_type: string;
    to: string;
    type: string;
    interactive?: Interactive;
}


export interface Interactive {
    type: string;
    action: Action;
    footer: TextItem;
    body: TextItem;
    header: TextItemWithType;
}

export interface TextItemWithType extends TextItem {
    type: string;
}

export interface TextItem {
    text: string;
}

export interface Action {
    button: string;
    sections: Array<Section>;
}

export interface Section {
    title: string;
    rows: Array<RowItem>
}

export interface RowItem {
    id: string;
    title: string;
    description: string;
}