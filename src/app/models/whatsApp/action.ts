import { xButton } from "./button";
import { xButtonSection } from "./button_seccion";
import { FlowActionPayload } from "./flow_action_payload";
import { xListSection } from "./list_section";

export interface xAction {
    button: string;
    buttons: Array<xButton>;
    catalog_id?: string;
    product_retailer_id?: string;
    sections?: Array<xListSection | xButtonSection>;
    mode?: 'draft' | 'published';
    flow_message_version?: string;
    flow_token?: string;
    flow_id?: string;
    flow_cta?: string;
    flow_action?: string;
    flow_action_payload?: FlowActionPayload
}