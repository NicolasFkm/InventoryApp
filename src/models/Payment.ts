import { PaymentType } from "@enumerators/PaymentType";
import { IOrder } from "./Order";
import { IPurchase } from "./Purchase";
import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
	value: number;
	type: PaymentType;
	installments: number;
}

const paymentSchema = new Schema({
	value: {
		type: Number
	},
	type: {
		type: String,
		enum: Object.values(PaymentType),
		default: PaymentType.Cash
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