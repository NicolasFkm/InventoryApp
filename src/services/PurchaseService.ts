import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { IPurchase } from "@models/Purchase";
import PurchaseRepository from "@repositories/PurchaseRepository";

export default class PurchaseService {

    public purchaseRepository: PurchaseRepository;

    constructor(){
        this.purchaseRepository = new PurchaseRepository();
    }

    async getById(id: number): Promise<IPurchase | null> {
        const purchase = await this.purchaseRepository.getById(id);

        return purchase;
    }

    async getAll(): Promise<IPurchase[]> {
        const purchase = await this.purchaseRepository.getAll();

        return purchase;
    }

    async create(purchase: IPurchase): Promise<IPurchase> {

        this.validate(purchase);

        const createdPurchase = this.purchaseRepository.add(purchase);;

        return createdPurchase;
    }

    async update(id: number, updateData: Partial<IPurchase>): Promise<IPurchase|undefined> {        
        const purchase = await this.purchaseRepository.getById(id);
        
        if(purchase == null) {
            throw new InvalidArgumentException("Invalid purchase identifier.");
        }

        let purchaseData: IPurchase = {...purchase, ...updateData} as IPurchase;
        
        this.validate(purchaseData);

        const updatedPurchase = await this.purchaseRepository.update(purchase, updateData)

        return updatedPurchase;
    }

    validate(purchase: IPurchase): void{
        if(purchase.items?.length == 0)
            throw new InvalidArgumentException("Purchase products invalid.");
    }

}