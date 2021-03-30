import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { IPayment } from "@models/Payment";
import PaymentRepository from "@repositories/PaymentRepository";

export default class PaymentService {

    public paymentRepository: PaymentRepository;

    constructor(){
        this.paymentRepository = new PaymentRepository();
    }

    async getById(id: number): Promise<IPayment | null> {
        const payment = await this.paymentRepository.getById(id);

        return payment;
    }

    async getAll(): Promise<IPayment[]> {
        const payment = await this.paymentRepository.getAll();

        return payment;
    }

    async create(payment: IPayment): Promise<IPayment> {

        this.validate(payment);

        const createdPayment = this.paymentRepository.add(payment);;

        return createdPayment;
    }

    async update(id: number, updateData: Partial<IPayment>): Promise<IPayment|undefined> {        
        const payment = await this.paymentRepository.getById(id);
        
        if(payment == null) {
            throw new InvalidArgumentException("Invalid payment identifier.");
        }

        let paymentData: IPayment = {...payment, ...updateData} as IPayment;
        
        this.validate(paymentData);

        const updatedPayment = await this.paymentRepository.update(payment, updateData)

        return updatedPayment;
    }

    validate(payment: IPayment): void{
        if(payment.value <= 0)
            throw new InvalidArgumentException("Payment amount invalid.");
    }

}