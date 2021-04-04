import { DataNotFoundException } from "@helpers/errors/DataNotFoundException";
import Product, { IProduct } from "@models/Product";
import Purchase, { IPurchase } from "@models/Purchase";
import { UpdateWriteOpResult } from "mongoose";

export default class ProductRepository {

    async getById(id: string): Promise<IProduct | null> {
        const product = await Product.findById(id)
            .populate("category")
            .populate("supplier")
            .populate("purchases")
            .populate("orders");

        return product;
    }

    async getAll(): Promise<IProduct[]> {
        const product = await Product.find();

        return product;
    }

    async addPurchase(id: string, purchaseId: string): Promise<IPurchase|null> {

        const purchase = await Purchase.findById(purchaseId);
        
        if(purchase != null){
            const product = await Product.findByIdAndUpdate(id, 
                { $push: {purchases: purchase._id}}, 
                { new: true, useFindAndModify: false});
            
            return product;
        }

        throw new DataNotFoundException("Purchase not find");
    }

    async add(product: IProduct): Promise<IProduct> {

        const createdProduct = await Product.create(product);

        return createdProduct;
    }

    async update(id: string, product: IProduct): Promise<UpdateWriteOpResult> {
        const updatedProduct = await Product.updateOne({ id }, product)

        return updatedProduct;
    }

}