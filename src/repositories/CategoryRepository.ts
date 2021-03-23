import { Category, CategoryCreationAttributes } from "@models/Category";

export default class CategoryRepository {

    async getById(id: number): Promise<Category | null> {
        const category = await Category.findByPk(id, { include: [{ all: true }] });

        return category;
    }

    async getAll(): Promise<Category[]> {
        const category = await Category.findAll({ include: [{ all: true }] });

        return category;
    }

    async add(category: CategoryCreationAttributes): Promise<Category> {

        const createdCategory = await Category.create(category);

        return createdCategory;
    }

    async update(Category: Category, updateData: Partial<CategoryCreationAttributes>): Promise<Category | undefined> {
        const updatedCategory = await Category?.update(updateData)

        return updatedCategory;
    }

}