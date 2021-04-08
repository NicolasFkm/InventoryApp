import Supplier, { ISupplier } from "@models/Supplier";
import { UpdateWriteOpResult } from "mongoose";

export default class SupplierRepository {

    async getById(id: string): Promise<ISupplier | null> {
        const supplier = await Supplier.findById(id)
            .populate("products");

        return supplier;
    }

    async getAll(): Promise<ISupplier[]> {
        const supplier = await Supplier.find();

        return supplier;
    }

    async create(supplier: ISupplier): Promise<ISupplier> {

        const createdSupplier = await Supplier.create(supplier);

        return createdSupplier;
    }

    async update(id: string, supplier: ISupplier): Promise<UpdateWriteOpResult> {
        const updatedUser = await Supplier.updateOne({ id }, supplier)

        return updatedUser;
    }

}