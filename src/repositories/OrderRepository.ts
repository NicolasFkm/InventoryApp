import { Order, OrderCreationAttributes } from "@models/Order";

export default class OrderRepository {

    async getById(id: number): Promise<Order | null> {
        const order = await Order.findByPk(id, { include: [{ all: true }] });

        return order;
    }

    async getAll(): Promise<Order[]> {
        const order = await Order.findAll({ include: [{ all: true }] });

        return order;
    }

    async add(order: OrderCreationAttributes): Promise<Order> {

        const createdOrder = await Order.create(order);

        return createdOrder;
    }

    async update(Order: Order, updateData: Partial<OrderCreationAttributes>): Promise<Order | undefined> {
        const updatedOrder = await Order?.update(updateData)

        return updatedOrder;
    }

}