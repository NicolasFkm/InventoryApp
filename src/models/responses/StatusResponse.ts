import ResponseBody from './ResponseBody';

export default class StatusResponse extends ResponseBody {
    public success: boolean;

    constructor(link: string, success: boolean) {
        super(link);
        this.success = success;
    }

}