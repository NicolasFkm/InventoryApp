import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { IPayment } from "@models/Payment";
import PaymentRepository from "@repositories/PaymentRepository";

export default class PaymentService {

    public paymentRepository: PaymentRepository;

    constructor() {
        this.paymentRepository = new PaymentRepository();
    }

    async getById(id: string): Promise<IPayment | null> {
        const payment = await this.paymentRepository.getById(id);

        return payment;
    }

    async getAll(): Promise<IPayment[]> {
        const payment = await this.paymentRepository.getAll();

        return payment;
    }

    async create(payment: IPayment): Promise<IPayment> {

        this.validate(payment);

        const createdPayment = this.paymentRepository.create(payment);;

        return createdPayment;
    }

    async update(id: string, paymentData: IPayment): Promise<boolean> {
        this.validate(paymentData);

        const updatedPayment = await this.paymentRepository.update(id, paymentData)

        return updatedPayment.ok == 1;
    }

    validate(payment: IPayment): void {
        if (payment.value <= 0)
            throw new InvalidArgumentException("Payment amount invalid.");
    }

}