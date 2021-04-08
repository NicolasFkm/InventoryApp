import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { ICart } from '@models/Cart';
import { CartItemAttributes } from '@models/CartItem';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import CartService from '@services/CartService';
import ProductService from '@services/ProductService';
import UserService from '@services/UserService';
import { Response, Request } from 'express';

export default class CartController {

    public cartService: CartService;
    public userService: UserService;
    public productService: ProductService;

    constructor() {
        this.cartService = new CartService();
        this.userService = new UserService();
        this.productService = new ProductService();
    }

    public postCreate = async (req: Request, res: Response): Promise<Response> => {
        try {
            let { userId }: { userId: string } = req.body;

            const user = await this.userService.getById(userId);

            const cart = { user } as ICart;

            const createdCart = await this.cartService.create(cart);

            let response = new EntityResponse(createdCart, req.url);

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

    public putUpdateCartItem = async (req: Request, res: Response): Promise<Response> => {
        try {
            let { id } = req.params;
            let { item }: { item: CartItemAttributes } = req.body;

            let cart = await this.cartService.getById(id);

            if (item.quantity == 0) {
                cart = await this.cartService.removeItem(id, item);
            }
            else if (cart?.items.some(item => item.productId == item.productId)) {
                cart = await this.cartService.updateCartItem(id, item);
            }
            else {
                cart = await this.cartService.addItem(id, item);
            }

            if (cart == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(cart, req.url);

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

    public putClearCart = async (req: Request, res: Response): Promise<Response> => {
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

    public getById = async (req: Request, res: Response): Promise<Response> => {
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
