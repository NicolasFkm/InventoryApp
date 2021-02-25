import { Association, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model, Optional } from "sequelize";
import { CouponType } from "../enumerators/CouponType";
import { Order } from "./Order";

export interface CouponAttributes {
	id: number;
    userId: number;
    type: CouponType;
    value: number;
}

interface CouponCreationAttributes extends Optional<CouponAttributes, "id"> { }

export class Coupon extends Model<CouponAttributes, CouponCreationAttributes>{
    public id!: number;
    public code: string;
    public value: number;
    
    public type: CouponType;

    public orders?: Order[];

    public addOrder!: HasManyAddAssociationMixin<Order, number>;
    public getOrder!: HasManyGetAssociationsMixin<Order>;

    public static associations: {
		order: Association<Order, Coupon>
	};
}