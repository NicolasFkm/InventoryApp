import Order, { IOrder } from "@models/Order";
import { UpdateWriteOpResult } from "mongoose";

export default class OrderRepository {

    async getById(id: string): Promise<IOrder | null> {
        const order = await Order.findById(id)
            .populate("user")
            .populate("payments")
            .populate("items");

        return order;
    }

    async getAll(): Promise<IOrder[]> {
        const order = await Order.find();

        return order;
    }

    async create(order: IOrder): Promise<IOrder> {

        const createdOrder = await Order.create(order);

        return createdOrder;
    }

    async update(id: number, order: IOrder): Promise<UpdateWriteOpResult> {
        const updatedOrder = await Order.updateOne({ id }, { $set: order }, { upsert: true, new: true });

        return updatedOrder;
    }

}