import { ProductStatus } from "@enumerators/ProductStatus";
import { ICategory } from "./Category";
import { IOrder } from "./Order";
import { ISupplier } from "./Supplier";
import { IPurchase } from "./Purchase";

import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    barcode?: string;
    price: number;
    costPrice: number;
    description?: string;
    quantity: number;
    status?: ProductStatus;
    category?: ICategory;
    supplier?: ISupplier;
    purchases?: IPurchase[];
    orders?: IOrder[];
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