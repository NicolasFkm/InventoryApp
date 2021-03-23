import { Purchase, PurchaseCreationAttributes } from "@models/Purchase";

export default class PurchaseRepository {

    async getById(id: number): Promise<Purchase | null> {
        const purchase = await Purchase.findByPk(id, { include: [{ all: true }] });

        return purchase;
    }

    async getAll(): Promise<Purchase[]> {
        const purchase = await Purchase.findAll({ include: [{ all: true }] });

        return purchase;
    }

    async add(purchase: PurchaseCreationAttributes): Promise<Purchase> {

        const createdPurchase = await Purchase.create(purchase);

        return createdPurchase;
    }

    async update(Purchase: Purchase, updateData: Partial<PurchaseCreationAttributes>): Promise<Purchase | undefined> {
        const updatedPurchase = await Purchase?.update(updateData)

        return updatedPurchase;
    }

}