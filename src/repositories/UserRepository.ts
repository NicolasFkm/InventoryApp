import User, { IUser } from "@models/User";

export default class UserRepository {

    async getById(id: string): Promise<IUser | null> {
        const user = await User.findById(id)?.populate("order");
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

    async add(user: IUser): Promise<IUser> {

        const createdUser = await User.create(user);

        return createdUser;
    }

    async update(user: IUser, updateData: Partial<IUser>): Promise<IUser | undefined> {
        const updatedUser = await user?.update(updateData)

        return updatedUser;
    }

}