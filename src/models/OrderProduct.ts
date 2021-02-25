import { Model } from "sequelize";
import { Optional } from "sequelize";
import { Order } from "./Order";
import { Product } from "./Product";

export interface OrderProductAttributes {
    quantity: number;
}

interface OrderProductCreationAttributes extends Optional<OrderProductAttributes, "quantity"> { }

export class OrderProduct extends Model<OrderProductAttributes, OrderProductCreationAttributes>{
    public quantity: number;
}

// OrderProduct.init()