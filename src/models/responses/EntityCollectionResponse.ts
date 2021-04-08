import { Document } from "mongoose";
import ResponseBody from './ResponseBody';

export default class EntityCollectionResponse extends ResponseBody {
    public data: Document[];

    constructor(data: Document[], link: string){
        super(link);
        this.data = data;
    }
}