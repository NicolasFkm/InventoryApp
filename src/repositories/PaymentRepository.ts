import Payment, { IPayment } from "@models/Payment";

export default class PaymentRepository {

    async getById(id: number): Promise<IPayment | null> {
        const payment = await Payment.findById(id);

        return payment;
    }

    async getAll(): Promise<IPayment[]> {
        const payment = await Payment.find();

        return payment;
    }

    async add(payment: IPayment): Promise<IPayment> {

        const createdPayment = await Payment.create(payment);

        return createdPayment;
    }

    async update(payment: IPayment, updateData: Partial<IPayment>): Promise<IPayment | undefined> {
        const updatedPayment = await payment?.update(updateData)

        return updatedPayment;
    }

}