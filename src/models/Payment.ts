import { Association, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, Model, Optional, Sequelize } from "sequelize";
import { PaymentType } from "@enumerators/PaymentType";
import { Order } from "./Order";
import { Purchase } from "./Purchase";

export interface PaymentAttributes {
	id: number;
	value: number;
    type: PaymentType;
    installments?: number;
}

export interface PaymentCreationAttributes extends Optional<PaymentAttributes, "id"> { }

export class Payment extends Model<PaymentAttributes, PaymentCreationAttributes>{
	public id!: number;
    public installments?: number;
	public value: number;
    
    public type: PaymentType;
    
    public order?: Order;
    public purchase?: Purchase;

    public getOrder!: HasOneGetAssociationMixin<Order>;
    public getPurchase!: HasOneGetAssociationMixin<Purchase>;

    public static associations: {
		order: Association<Order, Payment>,
		purchase: Association<Purchase, Payment>,
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
			value:{
				type: DataTypes.DECIMAL
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
    Payment.belongsTo(Purchase);
    Payment.belongsTo(Order);
};