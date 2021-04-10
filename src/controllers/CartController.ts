import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { ICart } from '@models/Cart';
import { CartItemAttributes } from '@models/CartItem';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import UserRepository from '@repositories/UserRepository';
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

    public putUpdateCartItem: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;
            let { quantity, product }: CartItemAttributes = req.body;

            let item = new CartItemAttributes();
            item.product = product;
            item.quantity = quantity;

            let user = await this.userService.getById(id);

            if(user == null) {
                throw new DataNotFoundException();
            }
            
            user.cart = user.cart!.populate("items");
            
            if (quantity == 0) {
                user.cart = await this.cartService.removeItem(user.cart.id, item);
            }
            else if (user.cart.items?.some(_ => _.product == item.product)) {
                user.cart = await this.cartService.updateCartItem(user.cart!.id, item);
            }
            else {
                user.cart = await this.cartService.addItem(user.cart!._id, item);
            }

            if (user.cart == null) {
                throw new DataNotFoundException();
            }

            user.save();

            let response = new EntityResponse(user.cart, req.url);

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
            let user = await this.userService.getById(id);

            const cart = await this.cartService.clear(user?.cart!.id);

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

    public getByUserId: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;

            const user = await this.userService.getById(id);

            if (user == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(user.cart!, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }


}
