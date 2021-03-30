import Product, { IProduct } from "@models/Product";

export default class ProductRepository {

    async getById(id: number): Promise<IProduct | null> {
        const product = await Product.findById(id)
            .populate("category")
            .populate("supplier")
            .populate("purchases")
            .populate("orders");

        return product;
    }

    async getAll(): Promise<IProduct[]> {
        const product = await Product.find();

        return product;
    }

    async add(product: IProduct): Promise<IProduct> {

        const createdProduct = await Product.create(product);

        return createdProduct;
    }

    async update(product: IProduct, updateData: Partial<IProduct>): Promise<IProduct | undefined> {
        const updatedProduct = await product?.update(updateData)

        return updatedProduct;
    }

}