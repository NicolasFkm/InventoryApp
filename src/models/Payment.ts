import { Association, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, Model, Optional } from "sequelize";
import { PaymentType } from "../enumerators/PaymentType";
import { Order } from "./Order";

export interface PaymentAttributes {
	id: number;
    type: PaymentType;
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> { }

export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes>{
    public id!: number;
    public installments?: number;
    
    public type: PaymentType;
    
    public order?: Order;

    public getOrder!: HasOneGetAssociationMixin<Order>;

    public static associations: {
		order: Association<Order, Payment>
	};
}