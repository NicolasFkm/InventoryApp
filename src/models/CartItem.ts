import { IProduct } from "./Product";
import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem extends Document {
	quantity: number;
	product: IProduct;
}

const cartItemSchema = new Schema({
	quantity: {
        type: Number,
        required: true,
        default: 1
    },
	products: {
		type: Schema.Types.ObjectId,
        ref: "Product"
	}
},  {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<ICartItem>('CartItem', cartItemSchema);