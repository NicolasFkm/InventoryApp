import { Model } from "sequelize";
import ResponseBody from './ResponseBody';

export default class EntityCollectionResponse extends ResponseBody {
    public data: Model[];

    constructor(data: Model[], link: string){
        super(link);
        this.data = data;
    }
}