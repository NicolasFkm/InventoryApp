import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { ProductCreationAttributes } from '@models/Product';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import ProductService from '@services/ProductService';
import SupplierService from '@services/SupplierService';
import { Response, Request } from 'express';

export default class ProductController {

    public productService: ProductService;
    public supplierService: SupplierService;

    constructor(){
        this.productService = new ProductService();;
        this.supplierService = new SupplierService();;
    }

    public postCreate = async(req: Request, res: Response) : Promise<Response> => {
        try{
            let { name, price, costPrice, description, quantity, status, barcode, supplierId }: 
            { name: string, price: number, costPrice: number, description: string|undefined, quantity: number, status: number, barcode: string|undefined, supplierId: number|undefined}  = req.body;
            
            const product = { name, price, costPrice, description, quantity, status, barcode } as ProductCreationAttributes;

            const createdProduct = await this.productService.create(product);
            
            if(supplierId != undefined){
                const supplier = await this.supplierService.getById(supplierId);
                if(supplier) {
                    supplier.addProduct(createdProduct!);
                    // supplier?.save();
                }
            }

            let response = new EntityResponse(createdProduct, req.url);
            
            let responseStatus = HttpStatus.SUCCESS;
            
            return res.status(responseStatus).send(response);
        }
        catch(error){
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);
            
            if(error instanceof InvalidArgumentException){
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }

            return res.status(status).send(errorResponse);
        }
    }
    
    public getAll = async(req: Request, res: Response) : Promise<Response> => {
        try{
            const products = await this.productService.getAll();
            
            let response = new EntityCollectionResponse(products, req.url);
            
            let status = HttpStatus.SUCCESS;
            
            return res.status(status).send(response);
        }
        catch(error){
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);
            
            if(error instanceof InvalidArgumentException){
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }

            return res.status(status).send(errorResponse);
        }
    }

    public getById = async(req: Request, res: Response) : Promise<Response> => {
        try{
            let { id } = req.params;
            
            const product = await this.productService.getById(+id);
            
            if(product == null){
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(product, req.url);
            
            let status = HttpStatus.SUCCESS;
            
            return res.status(status).send(response);
        }
        catch(error){
            let status = HttpStatus.INTERNAL_SERVER_ERROR;
            let errorResponse = new ErrorResponse(req.url);
            
            if(error instanceof InvalidArgumentException){
                status = HttpStatus.BAD_REQUEST;
                errorResponse.message = error.message;
            }
            
            if(error instanceof DataNotFoundException){
                status = HttpStatus.NOT_FOUND;
                errorResponse.message = error.message;
            }

            return res.status(status).send(errorResponse);
        }
    }


}
