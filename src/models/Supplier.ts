import { IProduct } from "./Product";
import mongoose, { Schema, Document } from 'mongoose';

export interface ISupplier extends Document {
    name: string;
	address?: string;
	city?: string;
	state?: string;
	zipCode?: string;
    products?: IProduct[];
}

const supplierSchema = new Schema({
	name: {
		type: String
	},
	address: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	zipCode: {
		type: String
	},
	products: [{
		type: Schema.Types.ObjectId,
        ref: "Product"
	}]
},  {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<ISupplier>('Supplier', supplierSchema);