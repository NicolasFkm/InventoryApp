import { Supplier, SupplierCreationAttributes } from "@models/Supplier";

export default class SupplierRepository {

    async getById(id: number): Promise<Supplier | null> {
        const supplier = await Supplier.findByPk(id, { include: [{ all: true }] });

        return supplier;
    }

    async getAll(): Promise<Supplier[]> {
        const supplier = await Supplier.findAll({ include: [{ all: true }] });

        return supplier;
    }

    async add(supplier: SupplierCreationAttributes): Promise<Supplier> {

        const createdSupplier = await Supplier.create(supplier);

        return createdSupplier;
    }

    async update(Supplier: Supplier, updateData: Partial<SupplierCreationAttributes>): Promise<Supplier | undefined> {
        const updatedSupplier = await Supplier?.update(updateData)

        return updatedSupplier;
    }

}