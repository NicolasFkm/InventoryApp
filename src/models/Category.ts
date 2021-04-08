import { IProduct } from "./Product";
import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
	name: string;
	products: IProduct[];
}

const categorySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	products: [{
		type: Schema.Types.ObjectId,
		ref: "Product"
	}]
}, {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<ICategory>('Category', categorySchema);