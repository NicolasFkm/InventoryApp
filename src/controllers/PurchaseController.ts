import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { CartItemAttributes } from '@models/CartItem';
import { IPurchase } from '@models/Purchase';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import CartService from '@services/CartService';
import PaymentService from '@services/PaymentService';
import ProductService from '@services/ProductService';
import PurchaseService from '@services/PurchaseService';
import { Response, Request } from 'express';

export default class PurchaseController {

    public purchaseService: PurchaseService;
    public cartService: CartService;
    public productService: ProductService;
    public paymentService: PaymentService;

    constructor() {
        this.purchaseService = new PurchaseService();
        this.productService = new ProductService();
        this.paymentService = new PaymentService();
        this.cartService = new CartService();
    }

    public postCreate = async (req: Request, res: Response): Promise<Response> => {
        try {
            let { cartId, paymentIds }: { cartId: string, paymentIds: string[] } = req.body;

            const cart = await this.cartService.getById(cartId);

            const purchase = { cart } as IPurchase;

            const createdPurchase = await this.purchaseService.create(purchase);

            await Promise.all(paymentIds.map(async (id) => {
                let purchase = this.purchaseService.addPayment(createdPurchase.id, id);
                return purchase;
            }));

            createdPurchase.save();

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

            const purchase = await this.purchaseService.getById(id);

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
