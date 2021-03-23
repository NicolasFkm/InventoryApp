import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { Supplier, SupplierAttributes, SupplierCreationAttributes } from "@models/Supplier";
import SupplierRepository from "@repositories/SupplierRepository";
import validator from 'validator';

export default class SupplierService {

    public supplierRepository: SupplierRepository;

    constructor(){
        this.supplierRepository = new SupplierRepository();
    }

    async getById(id: number): Promise<Supplier | null> {
        const supplier = await this.supplierRepository.getById(id);

        return supplier;
    }

    async getAll(): Promise<Supplier[]> {
        const supplier = await this.supplierRepository.getAll();

        return supplier;
    }

    async create(supplier: SupplierCreationAttributes): Promise<Supplier> {

        this.validate(supplier);

        const createdSupplier = this.supplierRepository.add(supplier);;

        return createdSupplier;
    }

    async update(id: number, updateData: Partial<SupplierCreationAttributes>): Promise<Supplier|undefined> {        
        const supplier = await Supplier.findByPk(id, { include: [{ all: true }] });
        
        if(supplier == null) {
            throw new InvalidArgumentException("Invalid supplier identifier.");
        }

        let supplierData: SupplierCreationAttributes = {...supplier, ...updateData} as SupplierCreationAttributes;
        
        this.validate(supplierData);

        const updatedSupplier = await this.supplierRepository.update(supplier, updateData)

        return updatedSupplier;
    }

    validate(supplier: SupplierCreationAttributes|SupplierAttributes): void{
        if(validator.isEmpty(supplier.name!))
            throw new InvalidArgumentException("Supplier name is invalid.");
    }

}