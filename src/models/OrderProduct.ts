import { initSequelize } from "@helpers/database/sequelize";
import { Association, DataTypes, Model } from "sequelize";
import { Optional } from "sequelize";
import { Order } from "./Order";
import { Product } from "./Product";

export interface OrderProductAttributes {
    id: number;
    quantity: number;
    productId: number;
    orderId: number;
}

interface OrderProductCreationAttributes extends Optional<OrderProductAttributes, "id"> { }

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

export const initOrderProduct = () => {
    OrderProduct.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            quantity: {
                type: DataTypes.INTEGER
            },
            orderId: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: false,
                references: {
                    model: 'Order',
                    key: 'orderId'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade',
                unique: 'unique-genre-per-post'
            },
            productId: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: false,
                references: {
                    model: 'Product',
                    key: 'productId'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade',
                unique: 'unique-genre-per-post'
            },
        },
        {
            tableName: "OrderProduct",
            timestamps: false,
            paranoid: true,
            sequelize: initSequelize()
        }
    );
}

export const associateOrderProduct = () => {
    OrderProduct.belongsTo(Order);
    OrderProduct.belongsTo(Product);
};