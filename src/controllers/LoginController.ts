import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { UserCreationAttributes } from '@models/User';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import { Response, Request } from 'express';
import LoginService from '@services/LoginService';
import Login from '@models/Login';
import StatusResponse from '@models/responses/StatusResponse';

export default class UserController {

    public loginService: LoginService;

    constructor(){
        this.loginService = new LoginService();;
    }

    public postAuthenticate =  async (req: Request, res: Response) : Promise<void> => {
        try{
            let { email, password, ...body}: {email: string, password:string, body: any}  = req.body;
            
            const login = {email, password} as Login;

            const isAuthenticated = await this.loginService.authenticate(login);
            
            let response = new StatusResponse(req.url, isAuthenticated);
            
            let status = (isAuthenticated)? 
            HttpStatus.SUCCESS: 
            HttpStatus.UNAUTHORIZED;
            
            res.status(status).send(response);
        }
        catch(error){
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);
            
            if(error instanceof InvalidArgumentException){
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }

            res.status(status).send(errorResponse);
        }
    }

}
