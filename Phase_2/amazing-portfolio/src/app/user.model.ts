import { Contacts } from "./contacts.model";

export class User{
    constructor(public fname:string,
        public lname:string,
        public username:string,
        public password:string,
        public contacts:Array<Contacts>){}
    
}