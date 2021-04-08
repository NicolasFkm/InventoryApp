import Payment, { IPayment } from "@models/Payment";
import { UpdateWriteOpResult } from "mongoose";

export default class PaymentRepository {

    async getById(id: string): Promise<IPayment | null> {
        const payment = await Payment.findById(id);

        return payment;
    }

    async getAll(): Promise<IPayment[]> {
        const payment = await Payment.find();

        return payment;
    }

    async create(payment: IPayment): Promise<IPayment> {

        const createdPayment = await Payment.create(payment);

        return createdPayment;
    }

    async update(id: string, payment: IPayment): Promise<UpdateWriteOpResult> {
        const updatedPayment = await Payment.updateOne({ id }, payment)

        return updatedPayment;
    }

}