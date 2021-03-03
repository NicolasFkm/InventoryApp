export class Exception extends Error {
    constructor(message: string) {
        super(message);
        message = `Error Message: ${message}\nStack Trace: ${super.stack}`;
        this.name = "Exception";
    }
}