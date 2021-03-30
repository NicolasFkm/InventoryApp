import { CouponType } from "@enumerators/CouponType";
import { IOrder } from "./Order";
import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
    code: string;
    type: CouponType;
    value: number;
	orders: IOrder[];
}

const couponSchema = new Schema({
	code: {
        type: String,
        required: true
    },
	type: {
		type: Number,
		min: 0,
		max: 3,
		default: 0
	},
	value: {
		type: Number,
		required: true
	},
	orders: [{
		type: Schema.Types.ObjectId,
		ref: "Order"
	}]
},  {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<ICoupon>('Coupon', couponSchema);
