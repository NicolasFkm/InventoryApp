import Purchase, { IPurchase } from "@models/Purchase";

export default class PurchaseRepository {

    async getById(id: number): Promise<IPurchase | null> {
        const purchase = await Purchase.findById(id);

        return purchase;
    }

    async getAll(): Promise<IPurchase[]> {
        const purchase = await Purchase.find();

        return purchase;
    }

    async add(purchase: IPurchase): Promise<IPurchase> {

        const createdPurchase = await Purchase.create(purchase);

        return createdPurchase;
    }

    async update(purchase: IPurchase, updateData: Partial<IPurchase>): Promise<IPurchase | undefined> {
        const updatedPurchase = await purchase?.update(updateData)

        return updatedPurchase;
    }

}