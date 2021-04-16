import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { ICart } from '@models/Cart';
import { CartItemAttributes } from '@models/CartItem';
import EntityResponse from '@models/responses/EntityResponse';
import CartService from '@services/CartService';
import ProductService from '@services/ProductService';
import UserService from '@services/UserService';
import { Response, Request, NextFunction, RequestHandler } from 'express';

export default class CartController {

    public cartService: CartService;
    public userService: UserService;
    public productService: ProductService;

    constructor() {
        this.cartService = new CartService();
        this.userService = new UserService();
        this.productService = new ProductService();
    }

    public postCreate: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { quantity, product }: CartItemAttributes = req.body;
            let { userId }: { userId: string} = req.body;

            let item = new CartItemAttributes();
            item.product = product;
            item.quantity = quantity;

            let cart = { items: [item], user: userId } as unknown as ICart; 

            let createdCart: ICart = await this.cartService.create(cart);

            createdCart = createdCart.populate({path: 'items.product', model: 'product'});
            
            let response = new EntityResponse(createdCart, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public putUpdateCartItem: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;
            let { quantity, product }: CartItemAttributes = req.body;

            let item = new CartItemAttributes();
            item.product = product;
            item.quantity = quantity;

            let cart = await this.cartService.getById(id);

            cart = cart.populate("items");
            
            if (quantity == 0) {
                cart = await this.cartService.removeItem(cart.id, item);
            }
            else if (cart.items?.some(_ => _.product == item.product)) {
                cart = await this.cartService.updateCartItem(cart!.id, item);
            }
            else {
                cart = await this.cartService.addItem(cart!._id, item);
            }

            if (cart == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(cart, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public deleteClearCart: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;

            const cart = await this.cartService.clear(id);

            if (cart == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(cart, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public getById: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;

            const cart = await this.cartService.getById(id);

            if (cart == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(cart, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

}
