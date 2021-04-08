import { IPayment } from "./Payment";
import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from "./Product";
import { ICart } from "./Cart";

export interface IPurchase extends Document {
	payments?: IPayment[];
	cart: ICart;
}

const purchaseSchema = new Schema({
	payments: [{
		type: Schema.Types.ObjectId,
		ref: "Payment"
	}],
	cart: {
		type: Schema.Types.ObjectId,
		ref: "Cart"
	}
}, {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<IPurchase>('Purchase', purchaseSchema);