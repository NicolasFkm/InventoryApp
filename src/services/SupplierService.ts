import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import Supplier, { ISupplier } from "@models/Supplier";
import SupplierRepository from "@repositories/SupplierRepository";
import validator from 'validator';

export default class SupplierService {

    public supplierRepository: SupplierRepository;

    constructor() {
        this.supplierRepository = new SupplierRepository();
    }

    async getById(id: string): Promise<ISupplier | null> {
        const supplier = await this.supplierRepository.getById(id);

        return supplier;
    }

    async getAll(): Promise<ISupplier[]> {
        const supplier = await this.supplierRepository.getAll();

        return supplier;
    }

    async create(supplier: ISupplier): Promise<ISupplier> {

        this.validate(supplier);

        const createdSupplier = this.supplierRepository.create(supplier);;

        return createdSupplier;
    }

    async update(id: string, supplierData: ISupplier): Promise<boolean> {
        this.validate(supplierData);

        const updatedSupplier = await this.supplierRepository.update(id, supplierData)

        return updatedSupplier.ok == 1;
    }

    validate(supplier: ISupplier): void {
        if (validator.isEmpty(supplier.name!))
            throw new InvalidArgumentException("Supplier name is invalid.");
    }

}