import { xProduct } from "./product";
import { xRow } from "./row";

export interface xListSection {
    product_items: Array<xProduct>,
    rows: Array<xRow>;
    title: string;
}