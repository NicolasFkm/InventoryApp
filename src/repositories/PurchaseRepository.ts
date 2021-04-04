import Purchase, { IPurchase } from "@models/Purchase";
import Product from "@models/Product";
import { DataNotFoundException } from "@helpers/errors/DataNotFoundException";
import { UpdateWriteOpResult } from "mongoose";

export default class PurchaseRepository {

    async getById(id: string): Promise<IPurchase | null> {
        const purchase = await Purchase.findById(id);

        return purchase;
    }

    async getAll(): Promise<IPurchase[]> {
        const purchase = await Purchase.find();

        return purchase;
    }

    async addProduct(id: string, productId: string): Promise<IPurchase|null> {

        const product = await Product.findById(productId);
        
        if(product != null){
            const purchase = await Purchase.findByIdAndUpdate(id, 
                { $push: {products: product._id}}, 
                { new: true, useFindAndModify: false});
            
            return purchase;
        }

        throw new DataNotFoundException("Product not find");
    }

    async add(purchase: IPurchase): Promise<IPurchase> {

        const createdPurchase = await Purchase.create(purchase);

        return createdPurchase;
    }

    async update(id: string, purchase: IPurchase): Promise<UpdateWriteOpResult> {
        const updatedUser = await Purchase.updateOne({ id }, purchase)

        return updatedUser;
    }

    

}