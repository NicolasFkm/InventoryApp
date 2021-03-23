import { User, UserCreationAttributes } from "@models/User";

export default class UserRepository {

    async getById(id: number): Promise<User | null> {
        const user = await User.findByPk(id, { include: [{ all: true }] });

        return user;
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = await User.findOne(
            { 
                where:{
                    email
                }, 
                include: [{ 
                    all: true 
                }] 
            });

        return user;
    }

    async getAll(): Promise<User[]> {
        const user = await User.findAll({ include: [{ all: true }] });

        return user;
    }

    async add(user: UserCreationAttributes): Promise<User> {

        const createdUser = await User.create(user);

        return createdUser;
    }

    async update(User: User, updateData: Partial<UserCreationAttributes>): Promise<User | undefined> {
        const updatedUser = await User?.update(updateData)

        return updatedUser;
    }

}