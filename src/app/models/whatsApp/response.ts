export interface xResponse {
    messaging_product: string;
    contacts: Array<{ input: string, wa_id: string }>;
    messages: Array<{ id: string }>;
}