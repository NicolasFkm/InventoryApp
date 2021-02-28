import { initSequelize } from "@helpers/database/sequelize";
import { ProductStatus } from "enumerators/ProductStatus";
import { Association, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, Model, Optional } from "sequelize";
import { PaymentType } from "../enumerators/PaymentType";
import { Coupon } from "./Coupon";
import { OrderProduct } from "./OrderProduct";
import { Payment } from "./Payment";
import { Product } from "./Product";
import { User } from "./User";

export interface OrderAttributes {
	id: number;
    coupon?: Coupon;
    user?: User;
    payments?: Payment[];
    products?: OrderProduct[];
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> { }

export class Order extends Model<OrderAttributes, OrderCreationAttributes>{
    public id!: number;

    public coupon?: Coupon;
    public user?: User;
    public payments?: Payment[];
    public products?: OrderProduct[];

    public addOrderProduct!: HasManyAddAssociationMixin<OrderProduct, number>;
    public getOrderProducts!: HasManyGetAssociationsMixin<OrderProduct>;
    public applyCoupon!: HasOneCreateAssociationMixin<Coupon>;
    public getCoupon!: HasOneGetAssociationMixin<Coupon>;
    public addPayment!: HasManyAddAssociationMixin<Payment, number>;
    public getPayments!: HasManyGetAssociationsMixin<Payment>;
    public addUser!: HasOneCreateAssociationMixin<User>;
    public getUser!: HasOneGetAssociationMixin<User>;

    public static associations: {
		coupon: Association<Coupon, Order>,
		products: Association<Product, Order>,
		user: Association<User, Order>,
		payment: Association<Payment, Order>
	};
}

export const initOrder = () => {
	Order.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			}
		},
		{
			tableName: "Order",
			timestamps: false,
      		paranoid: true,
			sequelize: initSequelize()
		}
	);
}

export const associateOrder = () => {
	Order.hasOne(Coupon);
    Order.hasMany(Payment);
    Order.belongsTo(User);
    Order.belongsToMany(Product, {through: typeof OrderProduct});
};