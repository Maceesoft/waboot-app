import { xAddress } from "./address";
import { xEmail } from "./email";
import { xName } from "./name";
import { xOrg } from "./org";
import { xPhone } from "./phone";
import { xUrl } from "./url";

/* name debe incluir al menos un opcional */
export interface xContact {
    addresses?: Array<xAddress>;
    birthday?: string;
    emails?: Array<xEmail>;
    name: xName,
    org?: xOrg,
    phones?: Array<xPhone>,
    urls?: Array<xUrl>
}