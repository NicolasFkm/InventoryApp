import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { ICategory } from "@models/Category";
import CategoryRepository from "@repositories/CategoryRepository";
import validator from 'validator';

export default class CategoryService {

    public categoryRepository: CategoryRepository;

    constructor(){
        this.categoryRepository = new CategoryRepository();
    }

    async getById(id: number): Promise<ICategory | null> {
        const category = await this.categoryRepository.getById(id);

        return category;
    }

    async getAll(): Promise<ICategory[]> {
        const category = await this.categoryRepository.getAll();

        return category;
    }

    async create(category: ICategory): Promise<ICategory> {

        this.validate(category);

        const createdCategory = this.categoryRepository.add(category);;

        return createdCategory;
    }

    async update(id: number, updateData: Partial<ICategory>): Promise<ICategory|undefined> {        
        const category = await this.categoryRepository.getById(id);
        
        if(category == null) {
            throw new InvalidArgumentException("Invalid category identifier.");
        }

        let categoryData: ICategory = {...category, ...updateData} as ICategory;
        
        this.validate(categoryData);

        const updatedCategory = await this.categoryRepository.update(category, updateData)

        return updatedCategory;
    }

    validate(category: ICategory): void{
        if(validator.isEmpty(category.name!))
            throw new InvalidArgumentException("Category name is invalid.");
    }

}