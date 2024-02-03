import ODataStore, { Options } from "devextreme/data/odata/store"

export class ODStore<TItem = any, TKey = any> extends ODataStore<TItem, TKey> {

    static token: (() => string | null) | string | undefined
    static baseUrl: string | undefined;

    constructor(options?: Options<TItem, TKey> | undefined) {
        const _resolveUrl = (url: string | undefined) => {

            if (!!!url) throw 'La url del oDataStore es obligatorio';

            if (url?.toLocaleLowerCase().startsWith('http') || !!!ODStore.baseUrl)
                return url;

            let urlP = url?.startsWith('/') ? url : `/${url}`;

            return `${ODStore.baseUrl}${urlP}`;
        }

        super({
            ...options,
            version: 4,
            key: options?.key ?? 'Id',
            keyType: options?.keyType ?? 'Int32',
            url: _resolveUrl(options?.url),
            withCredentials: true,
            deserializeDates: false,
            errorHandler(e) {
                console.log(e);
            },
            beforeSend(request) {
                let tokenVal: string | undefined | null;

                if (!!ODStore.token) {
                    if (typeof ODStore.token == 'function') {
                        tokenVal = ODStore.token();
                    }
                    else {
                        tokenVal = ODStore.token;
                    }
                }

                if (!!tokenVal) {
                    request.headers['Authorization'] = `Bearer ${tokenVal}`;
                }
            },
        });
    }
}