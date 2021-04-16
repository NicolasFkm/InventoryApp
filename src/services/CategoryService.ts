import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { ICategory } from "@models/Category";
import CategoryRepository from "@repositories/CategoryRepository";
import validator from 'validator';

export default class CategoryService {

    
    public categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async getById(id: string): Promise<ICategory | null> {
        const category = await this.categoryRepository.getById(id);

        return category;
    }

    async getAll(): Promise<ICategory[]> {
        const category = await this.categoryRepository.getAll();

        return category;
    }

    async create(category: ICategory): Promise<ICategory> {

        this.validate(category);

        const createdCategory = this.categoryRepository.create(category);;

        return createdCategory;
    }

    async update(id: string, updateCategory: ICategory): Promise<boolean> {
        this.validate(updateCategory);

        const updatedCategory = await this.categoryRepository.update(id, updateCategory)

        return updatedCategory.ok == 1;
    }

    validate(category: ICategory): void {
        if (validator.isEmpty(category.name!))
            throw new InvalidArgumentException("Category name is invalid.");
    }

}