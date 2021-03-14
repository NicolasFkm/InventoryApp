import { Exception } from "./Exception";

export class DataNotFoundException extends Exception{
    constructor(args?: any){

        if(args == undefined){
            args = "Data requested not found";
        }

        super(args);
        this.name = "DataNotFoundException"
    }
}