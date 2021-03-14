import ResponseBody from './ResponseBody';

export default class ErrorResponse extends ResponseBody {
    public message: string;

    constructor(link: string) {
        super(link);
    }

}