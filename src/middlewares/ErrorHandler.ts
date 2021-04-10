import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import ErrorResponse from '@models/responses/ErrorResponse';
import { Response, Request, NextFunction, RequestHandler } from 'express';

export default class ErrorHandler {

    constructor() {
    }

    public handleError = async (error: Error, req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let errorResponse = new ErrorResponse(req.url);

        if (error instanceof InvalidArgumentException) {
            status = HttpStatus.BAD_REQUEST;
            errorResponse.message = error.message;
        }

        if (error instanceof DataNotFoundException) {
            status = HttpStatus.NOT_FOUND;
            errorResponse.message = error.message;
        }

        return res.status(status).send(errorResponse);
    }
    
    public handleInvalidRoute = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        let status = HttpStatus.NOT_FOUND;
        let errorResponse = new ErrorResponse(req.url);

        return res.status(status).send(errorResponse);
    }
}
