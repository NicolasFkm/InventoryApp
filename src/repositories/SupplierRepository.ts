import Supplier, { ISupplier } from "@models/Supplier";

export default class SupplierRepository {

    async getById(id: number): Promise<ISupplier | null> {
        const supplier = await Supplier.findById(id)
            .populate("products");

        return supplier;
    }

    async getAll(): Promise<ISupplier[]> {
        const supplier = await Supplier.find();

        return supplier;
    }

    async add(supplier: ISupplier): Promise<ISupplier> {

        const createdSupplier = await Supplier.create(supplier);

        return createdSupplier;
    }

    async update(supplier: ISupplier, updateData: Partial<ISupplier>): Promise<ISupplier | undefined> {
        const updatedSupplier = await supplier?.update(updateData)

        return updatedSupplier;
    }

}