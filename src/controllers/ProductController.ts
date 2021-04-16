import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { IProduct } from '@models/Product';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import CategoryService from '@services/CategoryService';
import ProductService from '@services/ProductService';
import SupplierService from '@services/SupplierService';
import { Response, Request, NextFunction } from 'express';

export default class ProductController {

    public productService: ProductService;
    public supplierService: SupplierService;
    public categoryService: CategoryService;

    constructor() {
        this.productService = new ProductService();;
        this.supplierService = new SupplierService();;
        this.categoryService = new CategoryService();;
    }

    public postCreate = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { supplierId, categoryId }: { supplierId: string | undefined, categoryId: string | undefined } = req.body;
            
            const product = { ...req.body } as IProduct;
            const supplier = await this.supplierService.getById(supplierId!);
            
            if (supplier != undefined && supplier != null) {
                product.supplier = supplier!;
            }
            
            const category = await this.categoryService.getById(categoryId!);
            
            if (category != undefined && category != null) {
                product.category = category!;
            }

            const createdProduct = await this.productService.create(product);


            let response = new EntityResponse(createdProduct, req.url);

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

            const product = { ...req.body } as IProduct;
            
            const updatedProduct = await this.productService.update(id, product);

            if(updatedProduct){
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(product, req.url);

            let responseStatus = HttpStatus.CREATED;

            return res.status(responseStatus).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const products = await this.productService.getAll();

            let response = new EntityCollectionResponse(products, req.url);

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

            const product = await this.productService.getById(id);

            if (product == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(product, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }


}
