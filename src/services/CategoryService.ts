import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { Category, CategoryAttributes, CategoryCreationAttributes } from "@models/Category";
import CategoryRepository from "@repositories/CategoryRepository";
import validator from 'validator';

export default class CategoryService {

    public categoryRepository: CategoryRepository;

    constructor(){
        this.categoryRepository = new CategoryRepository();
    }

    async getById(id: number): Promise<Category | null> {
        const category = await this.categoryRepository.getById(id);

        return category;
    }

    async getAll(): Promise<Category[]> {
        const category = await this.categoryRepository.getAll();

        return category;
    }

    async create(category: CategoryCreationAttributes): Promise<Category> {

        this.validate(category);

        const createdCategory = this.categoryRepository.add(category);;

        return createdCategory;
    }

    async update(id: number, updateData: Partial<CategoryCreationAttributes>): Promise<Category|undefined> {        
        const category = await Category.findByPk(id, { include: [{ all: true }] });
        
        if(category == null) {
            throw new InvalidArgumentException("Invalid category identifier.");
        }

        let categoryData: CategoryCreationAttributes = {...category, ...updateData} as CategoryCreationAttributes;
        
        this.validate(categoryData);

        const updatedCategory = await this.categoryRepository.update(category, updateData)

        return updatedCategory;
    }

    validate(category: CategoryCreationAttributes|CategoryAttributes): void{
        if(validator.isEmpty(category.name!))
            throw new InvalidArgumentException("Category name is invalid.");
    }

}