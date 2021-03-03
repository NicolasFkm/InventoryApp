import { initSequelize } from "@helpers/database/sequelize";
import { Association, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, Model, Optional, Sequelize } from "sequelize";
import { PaymentType } from "@enumerators/PaymentType";
import { Order } from "./Order";

export interface PaymentAttributes {
	id: number;
    type: PaymentType;
    installments?: number;
}

export interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> { }

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

export const initPayment = (sequelize: Sequelize) => {
	Payment.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
            type: {
                type: DataTypes.ENUM({ values: Object.keys(PaymentType) })
            },
            installments: {
                type: DataTypes.INTEGER
            }
		},
		{
			tableName: "Payment",
			timestamps: false,
      		paranoid: true,
			sequelize: sequelize
		}
	);
}

export const associatePayment = () => {
	Payment.belongsTo(Order);
};