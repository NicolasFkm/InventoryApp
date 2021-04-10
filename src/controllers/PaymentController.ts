import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { IPayment } from '@models/Payment';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import PaymentService from '@services/PaymentService';
import { Response, Request, NextFunction } from 'express';

export default class PaymentController {

    public paymentService: PaymentService;

    constructor() {
        this.paymentService = new PaymentService();
    }

    public postCreate = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { type, installments, value }: { type: number, installments: number | undefined, value: number } = req.body;

            if (installments == 0 || installments == undefined) installments = 1;

            const payment = { type, installments, value } as IPayment;

            const createdPayment = await this.paymentService.create(payment);

            let response = new EntityResponse(createdPayment, req.url);

            let responseStatus = HttpStatus.SUCCESS;

            return res.status(responseStatus).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const payments = await this.paymentService.getAll();

            let response = new EntityCollectionResponse(payments, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;

            const payment = await this.paymentService.getById(id);

            if (payment == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(payment, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }


}
