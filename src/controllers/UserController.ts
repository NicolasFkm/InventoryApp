import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { IUser } from '@models/User';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import UserService from '@services/UserService';
import { Response, Request } from 'express';

export default class UserController {

    public userService: UserService;

    constructor(){
        this.userService = new UserService();;
    }

    public postCreate = async(req: Request, res: Response) : Promise<Response> => {
        try{
            let { name, username, email, password, role }: { name: string, username: string, email: string, password: string, role: number}  = req.body;
            
            const account = {
                name: name.toLowerCase(), 
                username: username.toLowerCase(), 
                email: email.toLowerCase(), 
                password, 
                role} as IUser;

            const createdAccount = await this.userService.create(account);
            
            let response = new EntityResponse(createdAccount, req.url);
            
            let status = HttpStatus.SUCCESS;
            
            return res.status(status).send(response);
        }
        catch(error){
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);
            
            if(error instanceof InvalidArgumentException){
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }

            return res.status(status).send(errorResponse);
        }
    }
    
    public getAll = async(req: Request, res: Response) : Promise<Response> => {
        try{
            console.log('Call get all');
            
            const createdAccount = await this.userService.getAll();
            
            let response = new EntityCollectionResponse(createdAccount, req.url);
            
            let status = HttpStatus.SUCCESS;
            
            return res.status(status).send(response);
        }
        catch(error){
            console.log(error);
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);
            
            if(error instanceof InvalidArgumentException){
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }

            return res.status(status).send(errorResponse);
        }
    }

    public getById = async(req: Request, res: Response) : Promise<Response> => {
        try{
            let { id } = req.params;
            
            const account = await this.userService.getById(id);
            
            if(account == null){
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(account, req.url);
            
            let status = HttpStatus.SUCCESS;
            
            return res.status(status).send(response);
        }
        catch(error){
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);
            
            if(error instanceof InvalidArgumentException){
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }
            
            if(error instanceof DataNotFoundException){
                status = HttpStatus.NOT_FOUND;
                errorResponse.message = error.message;
            }

            return res.status(status).send(errorResponse);
        }
    }


}
