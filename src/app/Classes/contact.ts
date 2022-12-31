import { User } from "./user";

export class Contact {
    private _firstName: string;
    private _lastName: string;
    private _accounts: User[];

    constructor(firstName: string, lastName: string, accounts: User[]) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._accounts = accounts;
    }

    get firstName(){
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get accounts(){
        return this._accounts;
    }
}
