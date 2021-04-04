import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { IPurchase } from "@models/Purchase";
import PurchaseRepository from "@repositories/PurchaseRepository";

export default class PurchaseService {

    public purchaseRepository: PurchaseRepository;

    constructor() {
        this.purchaseRepository = new PurchaseRepository();
    }

    async getById(id: string): Promise<IPurchase | null> {
        const purchase = await this.purchaseRepository.getById(id);

        return purchase;
    }

    async getAll(): Promise<IPurchase[]> {
        const purchase = await this.purchaseRepository.getAll();

        return purchase;
    }

    async addProduct(id: string | IPurchase, productId: string) {
        return await this.purchaseRepository.addProduct(id as string, productId);
    }

    async create(purchase: IPurchase): Promise<IPurchase> {

        this.validate(purchase);

        const createdPurchase = this.purchaseRepository.add(purchase);;

        return createdPurchase;
    }

    async update(id: string, purchaseData: IPurchase): Promise<boolean> {
        this.validate(purchaseData);

        const updatedPurchase = await this.purchaseRepository.update(id, purchaseData);

        return updatedPurchase.ok == 1;
    }

    validate(purchase: IPurchase): void {
        if (purchase.products?.length == 0)
            throw new InvalidArgumentException("Purchase products invalid.");
    }

}