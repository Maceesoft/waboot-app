import { Options } from "devextreme/data/odata/store";
import { ODStore } from "../libs/odata-store";

export const OContext = {
    Usuarios: () => new ODStore({ url: 'Usuarios' }),
    Calendarios: () => new ODStore({ url: 'Calendarios' }),
    Contactos: (opt?: Options<any, any>) => new ODStore({ ...opt, url: 'Contactos' }),
    WGrupos: () => new ODStore({ url: 'Wgroupos' }),
    Plantillas: () => new ODStore({ url: 'Plantillas' }),
    UsuarioTemplates: () => new ODStore({ url: 'UsuarioTemplates' }),
};