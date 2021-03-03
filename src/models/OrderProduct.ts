import { initSequelize } from "@helpers/database/sequelize";
import { Association, DataTypes, Model, Sequelize } from "sequelize";
import { Optional } from "sequelize";
import { Order } from "./Order";
import { Product } from "./Product";

export interface OrderProductAttributes {
    id: number;
    quantity: number;
}

export interface OrderProductCreationAttributes extends Optional<OrderProductAttributes, "id"> { }

export class OrderProduct extends Model<OrderProductAttributes, OrderProductCreationAttributes>{
    public id: number;
    public quantity: number;

    public product!: Product;
    public order!: Order;

    public static associations: {
        product: Association<Product, OrderProduct>,
        order: Association<Order, OrderProduct>
    }
}

export const initOrderProduct = (sequelize: Sequelize) => {
    OrderProduct.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            quantity: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: "OrderProduct",
            timestamps: false,
            paranoid: true,
            sequelize: sequelize
        }
    );
}

export const associateOrderProduct = () => {
    OrderProduct.belongsTo(Order);
    OrderProduct.belongsTo(Product);
};