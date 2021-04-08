import { ICoupon } from "./Coupon";
import { IPayment } from "./Payment";
import { IUser } from "./User";
import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from "./Product";
import { ICart } from "./Cart";

export interface IOrder extends Document {
	cart: ICart;
	payments?: IPayment[];
	coupon?: ICoupon;
}

const orderSchema = new Schema({
	cart: {
		type: Schema.Types.ObjectId,
		ref: "Cart"
	},
	coupon: {
		type: Schema.Types.ObjectId,
		ref: "Order"
	},
	payments: [{
		type: Schema.Types.ObjectId,
		ref: "Payment"
	}]
}, {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<IOrder>('Order', orderSchema);
