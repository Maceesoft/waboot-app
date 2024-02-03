




export interface HeaderComp {
    type: string;
    parameters: Array<TextParam>;
}

export interface BodyComp {
    type: string;
    parameters: Array<TextParam>;
}

export interface ButtonComp {
    type: string;
    sub_type: string;
    index: string;
    parameters: Array<PayloadParam>;
}

export interface TextParam {
    type: string;
    text: string;
}

export interface DocumentParam {
    type: string;
    document: {
        link: string;
        filename: string;
    }
}

export interface PayloadParam {
    type: string;
    payload: string;
}