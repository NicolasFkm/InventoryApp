import { Payment, PaymentCreationAttributes } from "@models/Payment";

export default class PaymentRepository {

    async getById(id: number): Promise<Payment | null> {
        const payment = await Payment.findByPk(id, { include: [{ all: true }] });

        return payment;
    }

    async getAll(): Promise<Payment[]> {
        const payment = await Payment.findAll({ include: [{ all: true }] });

        return payment;
    }

    async add(payment: PaymentCreationAttributes): Promise<Payment> {

        const createdPayment = await Payment.create(payment);

        return createdPayment;
    }

    async update(Payment: Payment, updateData: Partial<PaymentCreationAttributes>): Promise<Payment | undefined> {
        const updatedPayment = await Payment?.update(updateData)

        return updatedPayment;
    }

}