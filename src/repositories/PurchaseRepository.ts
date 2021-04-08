import Purchase, { IPurchase } from "@models/Purchase";
import Product from "@models/Product";
import { DataNotFoundException } from "@helpers/errors/DataNotFoundException";
import { UpdateWriteOpResult } from "mongoose";
import Payment from "@models/Payment";

export default class PurchaseRepository {

    async getById(id: string): Promise<IPurchase | null> {
        const purchase = await Purchase.findById(id);

        return purchase;
    }

    async getAll(): Promise<IPurchase[]> {
        const purchase = await Purchase.find();

        return purchase;
    }

    async addPayment(id: string, productId: string): Promise<IPurchase|null> {

        const payment = await Payment.findById(productId);
        
        if(payment != null){
            const purchase = await Purchase.findByIdAndUpdate(id, 
                { $push: {products: payment._id}}, 
                { new: true, useFindAndModify: false});
            
            return purchase;
        }

        throw new DataNotFoundException("Couldn't find the payment");
    }

    async create(purchase: IPurchase): Promise<IPurchase> {

        const createdPurchase = await Purchase.create(purchase);

        return createdPurchase;
    }

    async update(id: string, purchase: IPurchase): Promise<UpdateWriteOpResult> {
        const updatedUser = await Purchase.updateOne({ id }, purchase)

        return updatedUser;
    }

    

}