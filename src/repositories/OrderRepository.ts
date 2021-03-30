import Order, { IOrder } from "@models/Order";

export default class OrderRepository {

    async getById(id: number): Promise<IOrder | null> {
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

    async add(order: IOrder): Promise<IOrder> {

        const createdOrder = await Order.create(order);

        return createdOrder;
    }

    async update(order: IOrder, updateData: Partial<IOrder>): Promise<IOrder | undefined> {
        const updatedOrder = await order?.update(updateData)

        return updatedOrder;
    }

}