import { Product, ProductCreationAttributes } from "@models/Product";

export default class ProductRepository {

    async getById(id: number): Promise<Product | null> {
        const product = await Product.findByPk(id, { include: [{ all: true }] });

        return product;
    }

    async getAll(): Promise<Product[]> {
        const product = await Product.findAll({ include: [{ all: true }] });

        return product;
    }

    async add(product: ProductCreationAttributes): Promise<Product> {

        const createdProduct = await Product.create(product);

        return createdProduct;
    }

    async update(Product: Product, updateData: Partial<ProductCreationAttributes>): Promise<Product | undefined> {
        const updatedProduct = await Product?.update(updateData)

        return updatedProduct;
    }

}