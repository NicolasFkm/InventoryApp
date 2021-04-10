import User, { IUser } from "@models/User";
import { UpdateWriteOpResult } from "mongoose";

export default class UserRepository {

    async getById(id: string): Promise<IUser | null> {
        const user = await User.findById(id)?.populate("order").populate("cart");
        return user;
    }

    async getByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne(
            { email });

        return user;
    }

    async getAll(): Promise<IUser[]> {
        const user = await User.find();

        return user;
    }

    async create(user: IUser): Promise<IUser> {

        const createdUser = await User.create(user);

        return createdUser;
    }

    async update(id: string, user: IUser): Promise<UpdateWriteOpResult> {
        const updatedUser = await User.updateOne({ id }, user)

        return updatedUser;
    }

}