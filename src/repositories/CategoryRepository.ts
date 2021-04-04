import Category, { ICategory } from "@models/Category";

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

    async add(category: ICategory): Promise<ICategory> {

        const createdCategory = await Category.create(category);

        return createdCategory;
    }

    async update(category: ICategory, updateData: Partial<ICategory>): Promise<ICategory | undefined> {
        const updatedCategory = await category?.update(updateData)

        return updatedCategory;
    }

}