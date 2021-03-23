import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { Payment, PaymentAttributes, PaymentCreationAttributes } from "@models/Payment";
import PaymentRepository from "@repositories/PaymentRepository";

export default class PaymentService {

    public paymentRepository: PaymentRepository;

    constructor(){
        this.paymentRepository = new PaymentRepository();
    }

    async getById(id: number): Promise<Payment | null> {
        const payment = await this.paymentRepository.getById(id);

        return payment;
    }

    async getAll(): Promise<Payment[]> {
        const payment = await this.paymentRepository.getAll();

        return payment;
    }

    async create(payment: PaymentCreationAttributes): Promise<Payment> {

        this.validate(payment);

        const createdPayment = this.paymentRepository.add(payment);;

        return createdPayment;
    }

    async update(id: number, updateData: Partial<PaymentCreationAttributes>): Promise<Payment|undefined> {        
        const payment = await Payment.findByPk(id, { include: [{ all: true }] });
        
        if(payment == null) {
            throw new InvalidArgumentException("Invalid payment identifier.");
        }

        let paymentData: PaymentCreationAttributes = {...payment, ...updateData} as PaymentCreationAttributes;
        
        this.validate(paymentData);

        const updatedPayment = await this.paymentRepository.update(payment, updateData)

        return updatedPayment;
    }

    validate(payment: PaymentCreationAttributes|PaymentAttributes): void{
        if(payment.value <= 0)
            throw new InvalidArgumentException("Payment amount invalid.");
    }

}