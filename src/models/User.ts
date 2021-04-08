import { Role } from "@enumerators/Role";
import { IOrder } from "./Order";
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    role: Role;
    orders?: IOrder[];
}

const userSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: Number,
        min: 0,
        max: 2,
        default: 0
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }]
}, {
    timestamps: { createdAt: true, updatedAt: true }
})

export default mongoose.model<IUser>('User', userSchema);