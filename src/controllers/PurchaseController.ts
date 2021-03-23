import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { PurchaseCreationAttributes } from '@models/Purchase';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import PaymentService from '@services/PaymentService';
import ProductService from '@services/ProductService';
import PurchaseService from '@services/PurchaseService';
import { Response, Request } from 'express';

export default class PurchaseController {

    public purchaseService: PurchaseService;
    public productService: ProductService;
    public paymentService: PaymentService;

    constructor() {
        this.purchaseService = new PurchaseService();;
        this.productService = new ProductService();;
        this.paymentService = new PaymentService();;
    }

    public postCreate = async (req: Request, res: Response): Promise<Response> => {
        try {
            let { productIds, paymentsIds }: { productIds: number[], paymentsIds: number[] } = req.body;

            let payments = await Promise.all(paymentsIds.map(async (id) => await this.paymentService.getById(id)));

            const purchase = { payments } as PurchaseCreationAttributes;

            const createdPurchase = await this.purchaseService.create(purchase);

            let products = await Promise.all(productIds.map(async (id) => {
                const product = await this.productService.getById(id);
                if(product != null) createdPurchase.addProduct(product!);

                return product;
            }));

            let response = new EntityResponse(createdPurchase, req.url);

            let responseStatus = HttpStatus.SUCCESS;

            return res.status(responseStatus).send(response);
        }
        catch (error) {
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);

            if (error instanceof InvalidArgumentException) {
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }

            return res.status(status).send(errorResponse);
        }
    }

    public getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const purchases = await this.purchaseService.getAll();

            let response = new EntityCollectionResponse(purchases, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);

            if (error instanceof InvalidArgumentException) {
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }

            return res.status(status).send(errorResponse);
        }
    }

    public getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            let { id } = req.params;

            const purchase = await this.purchaseService.getById(+id);

            if (purchase == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(purchase, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
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
    }


}