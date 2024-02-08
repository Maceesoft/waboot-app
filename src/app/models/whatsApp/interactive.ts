import { xAction } from "./action";
import { xHeader } from "./header";
import { xText } from "./text";

export interface xInteractive {
    type: 'button' | 'catalog_message' | 'list' | 'product' | 'product_list' | 'flow';
    action: xAction;
    body?: xText;
    footer?: xText;
    header?: xHeader;
}