import LocalStore from "devextreme/data/local_store";


export class StoreX {
    private storage?: Storage;
    static session = new StoreX(sessionStorage);
    static local = new StoreX(localStorage);

    constructor(base: Storage) {
        this.storage = base;
    }

    public setObj(key: string, value: any) {
        if (value == null) {
            this.storage?.removeItem(key);
        }
        else {
            this.storage?.setItem(key, JSON.stringify(value));
        }
    }

    public getObj<T>(key: string): T | null {
        const item = this.storage?.getItem(key);

        if (item == null) return null;

        return <T>JSON.parse(item);
    }

    public set(key: string, value: string | null) {
        if (value == null) {
            this.storage?.removeItem(key);
        }
        else {
            this.storage?.setItem(key, value);
        }
    }

    public get(key: string) {
        return this.storage?.getItem(key);
    }
}