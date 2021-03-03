import { Role } from "@enumerators/Role";
import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { User, UserAttributes, UserCreationAttributes } from "@models/User";
import { ValidationFailed } from "sequelize-typescript";
import validator from 'validator';

export default class UserService {

    async getById(id: number): Promise<User | null> {
        const user = await User.findByPk(id, { include: [{ all: true }] });

        return user;
    }

    async getAll(): Promise<User[]> {
        const user = await User.findAll({ include: [{ all: true }] });

        return user;
    }

    async create(user: UserCreationAttributes): Promise<User> {

        this.validate(user);

        const createdUser = await User.create(user);

        return createdUser;
    }

    async update(id: number, updateData: Partial<UserCreationAttributes>): Promise<User|undefined> {        
        const user = await User.findByPk(id, { include: [{ all: true }] });
        
        let userData: UserCreationAttributes = {...user, ...updateData} as UserCreationAttributes;
        
        this.validate(userData);

        const updatedUser = await user?.update(updateData)

        return updatedUser;
    }

    validate(user: UserCreationAttributes|UserAttributes): void{
        
        if(!validator.isEmail(user.email!))
            throw new InvalidArgumentException("E-mail invalid.");
        
        if(!validator.isLength(user.username!, {min: 4, max: 32}))
            throw new InvalidArgumentException("Username invalid.");
        
        if(validator.isEmpty(user.name!))
            throw new InvalidArgumentException("Name invalid.");
        
        if(!validator.isStrongPassword(user.password!, {minLength: 6, minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 0}))
            throw new InvalidArgumentException("Password invalid.");
    }

}