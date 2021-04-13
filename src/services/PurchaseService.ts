import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { IPayment } from "@models/Payment";
import { IProduct } from "@models/Product";
import { IPurchase } from "@models/Purchase";
import ProductRepository from "@repositories/ProductRepository";
import PurchaseRepository from "@repositories/PurchaseRepository";

export default class PurchaseService {

    public purchaseRepository: PurchaseRepository;
    public productRepository: ProductRepository;

    constructor() {
        this.purchaseRepository = new PurchaseRepository();
        this.productRepository = new ProductRepository();
    }

    async getById(id: string): Promise<IPurchase | null> {
        const purchase = await this.purchaseRepository.getById(id);

        return purchase;
    }

    async getAll(): Promise<IPurchase[]> {
        const purchase = await this.purchaseRepository.getAll();

        return purchase;
    }

    async addPayment(id: string, paymentId: string) : Promise<IPayment | null >{
        let payment: IPayment | null = null;

        payment = await this.purchaseRepository.addPayment(id, paymentId);

        return payment;
    }

    async create(purchase: IPurchase): Promise<IPurchase> {

        this.validate(purchase);

        const createdPurchase = this.purchaseRepository.create(purchase);;

        return createdPurchase;
    }

    async update(id: string, purchaseData: IPurchase): Promise<boolean> {
        this.validate(purchaseData);

        const updatedPurchase = await this.purchaseRepository.update(id, purchaseData);

        return updatedPurchase.ok == 1;
    }

    validate(purchase: IPurchase): void {
        if (purchase.cart == null)
            throw new InvalidArgumentException("Purchase products invalid.");
    }

}