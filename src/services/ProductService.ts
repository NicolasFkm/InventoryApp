import { InvalidArgumentException } from "@helpers/errors/InvalidArgumentException";
import { IProduct } from "@models/Product";
import ProductRepository from "@repositories/ProductRepository";
import validator from 'validator';

export default class ProductService {

    public productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async getById(id: string): Promise<IProduct | null> {
        const product = await this.productRepository.getById(id);

        return product;
    }

    async getAll(): Promise<IProduct[]> {
        const product = await this.productRepository.getAll();

        return product;
    }

    async create(product: IProduct): Promise<IProduct> {

        this.validate(product);

        const createdProduct = this.productRepository.add(product);;

        return createdProduct;
    }

    async update(id: string, productData: IProduct): Promise<boolean> {
        this.validate(productData);

        const updatedProduct = await this.productRepository.update(id, productData)

        return updatedProduct.ok == 1;
    }

    validate(product: IProduct): void {

        if (validator.isEmpty(product.name!))
            throw new InvalidArgumentException("Product name is invalid.");

        if (product.price < 0)
            throw new InvalidArgumentException("Product price invalid.");

        if (product.costPrice < 0)
            throw new InvalidArgumentException("Product cost price invalid.");

        if (product.quantity < 0)
            throw new InvalidArgumentException("Product quantity invalid.");
    }

}