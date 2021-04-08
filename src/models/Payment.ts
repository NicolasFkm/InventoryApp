import { PaymentType } from "@enumerators/PaymentType";
import { IOrder } from "./Order";
import { IPurchase } from "./Purchase";
import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
	value: number;
	type: PaymentType;
	installments?: number;
	order?: IOrder;
	purchase?: IPurchase;
}

const paymentSchema = new Schema({
	value: {
		type: Number
	},
	type: {
		type: Number,
		min: 0,
		max: 3,
		default: 0
	},
	installments: {
		type: Number
	},
	order: {
		type: Schema.Types.ObjectId,
		ref: "Order"
	},
	purchase: {
		type: Schema.Types.ObjectId,
		ref: "Purchase"
	}
}, {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<IPayment>('Payment', paymentSchema);