import { IPayment } from "./Payment";
import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from "./Product";

export interface IPurchase extends Document {
	payments?: IPayment[];
	products?: IProduct[];
}

const purchaseSchema = new Schema({
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

export default mongoose.model<IPurchase>('Purchase', purchaseSchema);