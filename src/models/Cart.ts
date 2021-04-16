import { SaleStatus } from '@enumerators/SaleStatus';
import mongoose, { Schema, Document } from 'mongoose';
import { CartItemAttributes } from './CartItem';
import { IUser } from './User';

export interface ICart extends Document {
	items: CartItemAttributes[] | undefined;
	user: IUser;
	status: SaleStatus

}

const cartSchema = new Schema({
	items: {
		type: [{
			quantity:{
				type: Number
			},
			product: {
				type: Schema.Types.ObjectId,
				ref: "Product"
			}
		}]
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	status: {
		type: String,
		enum: Object.values(SaleStatus),
		default: SaleStatus.Created
	}
}, {
	timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<ICart>('Cart', cartSchema);
