import { Exception } from "./Exception";

export class InvalidArgumentException extends Exception{
    constructor(args){
        super(args);
        this.name = "InvalidArgumentException"
    }
}