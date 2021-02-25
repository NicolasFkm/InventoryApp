import { Optional, Model, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin } from "sequelize";
import { Product } from "./Product";

export interface SupplierAttributes {
	id: number;
	name: string;
}

export interface SupplierCreationAttributes extends Optional<SupplierAttributes, "id"> { }

export class Supplier extends Model<SupplierAttributes, SupplierCreationAttributes> {
    public id!: number;
    public name: string;

    public products?: Product[];

    public addProduct!: HasManyAddAssociationMixin<Product, number>;
    public getProducts!: HasManyGetAssociationsMixin<Product>;

    public static associations: {
        products: Association<Product, Supplier>
    }
}