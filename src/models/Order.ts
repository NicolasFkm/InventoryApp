import { Association, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, Model, Optional, Sequelize } from "sequelize";
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
    products?: Product[];
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> { }

export class Order extends Model<OrderAttributes, OrderCreationAttributes>{
    public id!: number;

    public coupon?: Coupon;
    public user?: User;
    public payments?: Payment[];
    public products?: Product[];

    public addProduct!: HasManyAddAssociationMixin<Product, number>;
    public getProducts!: HasManyGetAssociationsMixin<Product>;
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

export const initOrder = (sequelize: Sequelize) => {
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
			sequelize: sequelize
		}
	);
}

export const associateOrder = () => {
	Order.belongsTo(Coupon);
    Order.belongsTo(User);
    Order.hasMany(Payment);
    Order.belongsToMany(Product, {through: typeof OrderProduct});
};