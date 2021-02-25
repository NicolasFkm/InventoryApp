import { Association, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, Model, Optional } from "sequelize";
import { PaymentType } from "../enumerators/PaymentType";
import { Coupon } from "./Coupon";
import { OrderProduct } from "./OrderProduct";
import { Payment } from "./Payment";
import { User } from "./User";

export interface OrderAttributes {
	id: number;
    userId: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "id"> { }

export class Order extends Model<OrderAttributes, OrderCreationAttributes>{
    public id!: number;
    public userId: number;

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
		products: Association<OrderProduct, Order>,
		user: Association<User, Order>,
		payment: Association<Payment, Order>
	};
}