import mongoose, { Schema, Document } from 'mongoose';
import { CartItemAttributes } from './CartItem';
import { IUser } from './User';

export interface ICart extends Document {
	items: CartItemAttributes[];
}

const cartSchema = new Schema({
	items: {
		type: [{
			quantity:{
				type: Number
			},
			product: {
				type: Schema.Types.ObjectId,
				ref: "Product"
			}
		}]
	}
}, {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<ICart>('Cart', cartSchema);
