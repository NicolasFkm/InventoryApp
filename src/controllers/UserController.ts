import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { IUser } from '@models/User';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import UserService from '@services/UserService';
import { Response, Request, NextFunction } from 'express';
import StatusResponse from '@models/responses/StatusResponse';
import CartService from '@services/CartService';
import { ICart } from '@models/Cart';

export default class UserController {

    public userService: UserService;
    public cartService: CartService;

    constructor() {
        this.userService = new UserService();
        this.cartService = new CartService();
    }

    public postCreate = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { name, username, email, password, role }: { name: string, username: string, email: string, password: string, role: number } = req.body;

            const account = {
                name: name,
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                password,
                role
            } as IUser;

            const user = await this.userService.create(account);

            user.save();

            let response = new EntityResponse(user, req.url);

            let status = HttpStatus.CREATED;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const createdAccount = await this.userService.getAll();

            let response = new EntityCollectionResponse(createdAccount, req.url);

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

            const account = await this.userService.getById(id);

            if (account == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(account, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public putUpdateUser = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;
            let { name, username, email, role }: { name: string, username: string, email: string, role: number } = req.body;

            const user = {
                name,
                username,
                email: email.toLowerCase(),
                role
            } as IUser;

            const updatedUser = await this.userService.update(id, user);

            if (!updatedUser) {
                throw new DataNotFoundException();
            }

            let response = new StatusResponse(req.url, updatedUser);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public getOpenCartByUserId = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;

            const user = await this.userService.getById(id);

            let cart = await this.cartService.getOpenCartByUserId(user);

            if(cart == null){
                let cartModel = { } as ICart; 

                cart = await this.cartService.create(cartModel);
            }

            let response = new EntityResponse(user, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }
}
