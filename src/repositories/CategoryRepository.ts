import Category, { ICategory } from "@models/Category";
import { UpdateWriteOpResult } from "mongoose";

export default class CategoryRepository {

    async getById(id: string): Promise<ICategory | null> {
        const category = await Category.findById(id)
            .populate("products")

        return category;
    }

    async getAll(): Promise<ICategory[]> {
        const category = await Category.find()

        return category;
    }

    async create(category: ICategory): Promise<ICategory> {

        const createdCategory = await Category.create(category);

        return createdCategory;
    }

    async update(id: string, category: ICategory): Promise<UpdateWriteOpResult> {
        const updatedCategory = await Category.updateOne({ id }, { $set: category }, { upsert: true, new: true });

        return updatedCategory;
    }

}