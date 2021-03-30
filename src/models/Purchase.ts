import { IPayment } from "./Payment";
import { ICartItem } from "./CartItem";
import mongoose, { Schema, Document } from 'mongoose';

export interface IPurchase extends Document {
    payments?: IPayment[];
    items?: ICartItem[];
}

const purchaseSchema = new Schema({
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

export default mongoose.model<IPurchase>('Purchase', purchaseSchema);