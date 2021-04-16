import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { IUser } from "@models/User";
import UserRepository from "@repositories/UserRepository";
import validator from 'validator';
import bcrypt from 'bcrypt';
import { DataNotFoundException } from "@helpers/errors/DataNotFoundException";

export default class UserService {

    private _salt: number = 12;
    public userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getById(id: string): Promise<IUser> {
        const user = await this.userRepository.getById(id);

        if (user == null) {
            throw new DataNotFoundException("User ID not found.");
        }

        return user;
    }

    async getAll(): Promise<IUser[]> {
        const user = await this.userRepository.getAll();

        return user;
    }

    async create(user: IUser): Promise<IUser> {

        this.validate(user);

        user.password = await bcrypt.hash(user.password, this._salt);

        const createdUser = this.userRepository.create(user);;

        return createdUser;
    }

    async update(id: string, userData: IUser): Promise<boolean> {
        this.validate(userData);

        const updatedUser = await this.userRepository.update(id, userData);

        return updatedUser.ok == 1;
    }

    validate(user: IUser): void {

        if (!validator.isEmail(user.email!))
            throw new InvalidArgumentException("E-mail invalid.");

        if (!validator.isLength(user.username!, { min: 4, max: 32 }))
            throw new InvalidArgumentException("Username invalid.");

        if (validator.isEmpty(user.name!))
            throw new InvalidArgumentException("Name invalid.");

        if (user.password != undefined && !validator.isStrongPassword(user.password!, { minLength: 6, minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 0 }))
            throw new InvalidArgumentException("Password invalid.");
    }

}