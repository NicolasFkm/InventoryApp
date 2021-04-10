import { HttpStatus } from '@enumerators/HttpStatus';
import { DataNotFoundException } from '@helpers/errors/DataNotFoundException';
import { InvalidArgumentException } from '@helpers/errors/InvalidArgumentException';
import { ISupplier } from '@models/Supplier';
import EntityCollectionResponse from '@models/responses/EntityCollectionResponse';
import EntityResponse from '@models/responses/EntityResponse';
import ErrorResponse from '@models/responses/ErrorResponse';
import SupplierService from '@services/SupplierService';
import { Response, Request, NextFunction } from 'express';

export default class SupplierController {

    public supplierService: SupplierService;

    constructor() {
        this.supplierService = new SupplierService();;
    }

    public postCreate = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            let { name, address, city, state, zipCode }: { name: string, address: string | undefined, city: string | undefined, state: string | undefined, zipCode: string | undefined } = req.body;

            const supplier = { name, address, city, state, zipCode } as ISupplier;

            const createdSupplier = await this.supplierService.create(supplier);

            let response = new EntityResponse(createdSupplier, req.url);

            let responseStatus = HttpStatus.SUCCESS;

            return res.status(responseStatus).send(response);
        }
        catch (error) {
            next(error);
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response|void> => {
        try {
            const suppliers = await this.supplierService.getAll();

            let response = new EntityCollectionResponse(suppliers, req.url);

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

            const supplier = await this.supplierService.getById(id);

            if (supplier == null) {
                throw new DataNotFoundException();
            }

            let response = new EntityResponse(supplier, req.url);

            let status = HttpStatus.SUCCESS;

            return res.status(status).send(response);
        }
        catch (error) {
            next(error);
        }
    }


}
