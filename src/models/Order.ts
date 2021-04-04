import { ICoupon } from "./Coupon";
import { IPayment } from "./Payment";
import { IUser } from "./User";
import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from "./Product";

export interface IOrder extends Document {
	coupon?: ICoupon;
	user?: IUser;
	payments?: IPayment[];
	items?: IProduct[];
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
	products: [{
		type: Schema.Types.ObjectId,
		ref: "Product"
	}]
}, {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<IOrder>('Order', orderSchema);
