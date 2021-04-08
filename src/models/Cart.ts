import mongoose, { Schema, Document } from 'mongoose';
import { CartItemAttributes } from './CartItem';
import { ICoupon } from './Coupon';
import { IUser } from './User';

export interface ICart extends Document {
	items: CartItemAttributes[];
	coupon?: ICoupon;
	user?: IUser;
}

const cartSchema = new Schema({
	items: {
		type: CartItemAttributes,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	}
}, {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<ICart>('Cart', cartSchema);
