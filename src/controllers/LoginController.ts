import { HttpStatus } from '@enumerators/HttpStatus';
import { Response, Request, NextFunction } from 'express';
import LoginService from '@services/LoginService';
import Login from '@models/Login';
import StatusResponse from '@models/responses/StatusResponse';

export default class UserController {

    public loginService: LoginService;

    constructor() {
        this.loginService = new LoginService();;
    }

    public postAuthenticate = async (req: Request, res: Response, next: NextFunction): Promise<StatusResponse|void> => {
        try {
            let { email, password }: { email: string, password: string } = req.body;

            const login = {
                email: email.toLowerCase(),
                password
            } as Login;

            const isAuthenticated = await this.loginService.authenticate(login);

            let response = new StatusResponse(req.url, isAuthenticated);

            let status = (isAuthenticated) ?
                HttpStatus.SUCCESS :
                HttpStatus.UNAUTHORIZED;

            res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

}
