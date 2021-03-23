import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { Purchase, PurchaseAttributes, PurchaseCreationAttributes } from "@models/Purchase";
import PurchaseRepository from "@repositories/PurchaseRepository";

export default class PurchaseService {

    public purchaseRepository: PurchaseRepository;

    constructor(){
        this.purchaseRepository = new PurchaseRepository();
    }

    async getById(id: number): Promise<Purchase | null> {
        const purchase = await this.purchaseRepository.getById(id);

        return purchase;
    }

    async getAll(): Promise<Purchase[]> {
        const purchase = await this.purchaseRepository.getAll();

        return purchase;
    }

    async create(purchase: PurchaseCreationAttributes): Promise<Purchase> {

        this.validate(purchase);

        const createdPurchase = this.purchaseRepository.add(purchase);;

        return createdPurchase;
    }

    async update(id: number, updateData: Partial<PurchaseCreationAttributes>): Promise<Purchase|undefined> {        
        const purchase = await Purchase.findByPk(id, { include: [{ all: true }] });
        
        if(purchase == null) {
            throw new InvalidArgumentException("Invalid purchase identifier.");
        }

        let purchaseData: PurchaseCreationAttributes = {...purchase, ...updateData} as PurchaseCreationAttributes;
        
        this.validate(purchaseData);

        const updatedPurchase = await this.purchaseRepository.update(purchase, updateData)

        return updatedPurchase;
    }

    validate(purchase: PurchaseCreationAttributes|PurchaseAttributes): void{
        if(purchase.products?.length == 0)
            throw new InvalidArgumentException("Purchase products invalid.");
    }

}