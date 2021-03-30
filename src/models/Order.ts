import { ICoupon } from "./Coupon";
import { IPayment } from "./Payment";
import { IUser } from "./User";
import mongoose, { Schema, Document } from 'mongoose';
import { ICartItem } from "./CartItem";

export interface IOrder extends Document {
    coupon?: ICoupon;
    user?: IUser;
    payments?: IPayment[];
    items?: ICartItem[];
}

const orderSchema = new Schema({
	coupon: {
		type: Schema.Types.ObjectId,
        ref: "Coupon"
	},
	user: {
		type: Schema.Types.ObjectId,
        ref: "User"
	},
	payments: [{
		type: Schema.Types.ObjectId,
        ref: "Payment"
	}],
	items: [{
		type: Schema.Types.ObjectId,
        ref: "CartItem"
	}]
},  {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<IOrder>('Order', orderSchema);
