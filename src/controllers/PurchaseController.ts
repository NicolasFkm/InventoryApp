import { HttpStatus } from '@enumerators/HttpStatus';
import { SaleStatus } from '@enumerators/SaleStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { IPurchase } from '@models/Purchase';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import CartService from '@services/CartService';
import PaymentService from '@services/PaymentService';
import ProductService from '@services/ProductService';
import PurchaseService from '@services/PurchaseService';
import { Response, Request, NextFunction } from 'express';

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

    public postCreate = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { cartId, paymentIds }: { cartId: string, paymentIds: string[] } = req.body;

            const cart = await this.cartService.getById(cartId);
            
            if(cart == null) {
                throw new DataNotFoundException("Cart not found");
            }

            
            const purchase = { cart } as IPurchase;
            
            const createdPurchase = await this.purchaseService.create(purchase);
            
            if(paymentIds != undefined){
                cart.status = SaleStatus.Paid;
                let payments = await Promise.all(paymentIds.map(async (id) => {
                    let payment = this.purchaseService.addPayment(createdPurchase.id, id);
                    return payment;
                }));
                
                createdPurchase.payments = payments;
            }{
                cart.status = SaleStatus.WaitingPayment;
            }
            
            cart.save();

            let response = new EntityResponse(createdPurchase, req.url);

            let responseStatus = HttpStatus.CREATED;

            return res.status(responseStatus).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public putAddPayment =  async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;
            let { paymentId } : { paymentId: string } = req.body;

            const purchase = await this.purchaseService.getById(id);
            
            if(purchase == null) {
                throw new DataNotFoundException("Purchase not found");
            }

            const payment = await this.purchaseService.addPayment(id, paymentId);           

            purchase.payments?.push(payment);

            let response = new EntityResponse(purchase, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public deletePayments =  async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;

            const purchase = await this.purchaseService.clearPayments(id);           

            let response = new EntityResponse(purchase!, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public deletePaymentById =  async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id, paymentId } = req.params;

            const purchase = await this.purchaseService.removePaymentById(id, paymentId);           

            let response = new EntityResponse(purchase!, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }


    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const purchases = await this.purchaseService.getAll();

            let response = new EntityCollectionResponse(purchases, req.url);

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

            const purchase = await this.purchaseService.getById(id);

            if (purchase == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(purchase, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }


}
