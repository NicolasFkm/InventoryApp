import bcrypt from 'bcrypt';
import Login from "@models/Login";
import UserRepository from '@repositories/UserRepository';

export default class LoginService {

    public userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    public authenticate = async(login: Login) : Promise<boolean> => {
        const account = await this.userRepository.getByEmail(login.email);
        
        if(account == null){
            return false;
        }

        const isValid = bcrypt.compareSync(login.password, account?.password!);
        
        return isValid;
    }
}