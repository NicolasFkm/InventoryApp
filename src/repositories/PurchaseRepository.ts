import Purchase, { IPurchase } from "@models/Purchase";
import { DataNotFoundException } from "@helpers/errors/DataNotFoundException";
import { UpdateWriteOpResult } from "mongoose";
import Payment, { IPayment } from "@models/Payment";

export default class PurchaseRepository {

    async getById(id: string): Promise<IPurchase | null> {
        const purchase = await Purchase.findById(id);

        return purchase;
    }

    async getAll(): Promise<IPurchase[]> {
        const purchase = await Purchase.find();

        return purchase;
    }

    async addPayment(id: string, productId: string): Promise<IPayment> {

        const payment = await Payment.findById(productId);
        
        if(payment != null){
            const purchase = await Purchase.findByIdAndUpdate(id, 
                { $push: {payments: payment._id}}, 
                { new: true, useFindAndModify: false});
            
            return payment;
        }

        throw new DataNotFoundException("Couldn't find the payment");
    }

    async removePayment(id: string, paymentId: string): Promise<IPurchase> {

        const purchase = await Purchase.findByIdAndUpdate(id,
            { $pull: { payments: paymentId } },
            { new: true, useFindAndModify: false });

        if (purchase == null) {
            throw new DataNotFoundException("Couldn't find the purchase");
        }

        return purchase;
    }


    async clearPayments(id: string): Promise<IPurchase> {
        const purchase = await Purchase.findByIdAndUpdate(id,
            { $set: { payments: [] } },
            { new: true, useFindAndModify: false });

        if (purchase == null) {
            throw new DataNotFoundException("Couldn't find the purchase");
        }

        return purchase;
    }

    async create(purchase: IPurchase): Promise<IPurchase> {

        const createdPurchase = await Purchase.create(purchase);

        return createdPurchase;
    }

    async update(id: string, purchase: IPurchase): Promise<UpdateWriteOpResult> {
        const updatedUser = await Purchase.updateOne({ id }, { $set: purchase }, { upsert: true, new: true });

        return updatedUser;
    }

    

}