import { User } from "./user";

export class Contact {
    private _name: string;
    private _accounts: User[];

    constructor(name: string, accounts: User[]) {
        this._name = name;
        this._accounts = accounts;
    }

    get name(){
        return this._name;
    }

    get accounts(){
        return this._accounts;
    }
}
