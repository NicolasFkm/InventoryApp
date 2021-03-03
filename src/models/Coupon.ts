import { initSequelize } from "@helpers/database/sequelize";
import { Association, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model, Optional, Sequelize } from "sequelize";
import { CouponType } from "@enumerators/CouponType";
import { Order } from "./Order";

export interface CouponAttributes {
	id: number;
    code: string;
    type: CouponType;
    value: number;
}

export interface CouponCreationAttributes extends Optional<CouponAttributes, "id"> { }

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

export const initCoupon = (sequelize: Sequelize) => {
	Coupon.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
			code: {
                type: DataTypes.STRING
            },
            type: {
                type: DataTypes.ENUM({ values: Object.keys(CouponType) })
            },
            value: {
                type: DataTypes.DECIMAL
            }
		},
		{
			tableName: "Coupon",
			timestamps: false,
      		paranoid: true,
			sequelize: sequelize
		}
	);
}

export const associateCoupon = () => {
	Coupon.hasMany(Order);
};