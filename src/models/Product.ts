import { ProductStatus } from "@enumerators/ProductStatus";
import { ICategory } from "./Category";
import { IOrder } from "./Order";
import { ISupplier } from "./Supplier";
import { IPurchase } from "./Purchase";

import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    barcode: string | undefined;
    price: number;
    costPrice: number;
    description: string | undefined;
    quantity: number;
    status: ProductStatus | undefined;
    category: ICategory | undefined;
    supplier: ISupplier;
    purchases: IPurchase[] | undefined;
    orders: IOrder[] | undefined;
}

const productSchema = new Schema({
    name: {
        type: String
    },
    barcode: {
        type: String
    },
    price: {
        type: Number
    },
    costPrice: {
        type: Number
    },
    description: {
        type: String
    },
    quantity: {
        type: Number
    },
    status: {
        type: Number,
        min: 0,
        max: 3,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: "Supplier"
    },
    purchases: [{
        type: Schema.Types.ObjectId,
        ref: "Purchase"
    }],
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }]
}, {
    timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<IProduct>('Product', productSchema);