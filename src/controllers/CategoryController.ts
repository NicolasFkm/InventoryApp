import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { ICategory } from '@models/Category';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import CategoryService from '@services/CategoryService';
import { Response, Request, NextFunction } from 'express';

export default class CategoryController {

    public categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();;
    }

    public postCreate = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { name }: { name: string } = req.body;

            const category = { name } as ICategory;

            const createdCategory = await this.categoryService.create(category);

            let response = new EntityResponse(createdCategory, req.url);

            let responseStatus = HttpStatus.CREATED;

            return res.status(responseStatus).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public putUpdate = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;
            let { name }: { name: string } = req.body;

            const category = { name } as ICategory;

            const updatedCategory = await this.categoryService.update(id, category);

            if(updatedCategory){
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(category, req.url);

            let responseStatus = HttpStatus.CREATED;

            return res.status(responseStatus).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const categories = await this.categoryService.getAll();

            let response = new EntityCollectionResponse(categories, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public getById = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { id } = req.params;

            const category = await this.categoryService.getById(id);

            if (category == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(category, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }


}
