import { Association, HasManyAddAssociationMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, Model, Optional } from "sequelize";
import { ProductStatus } from "../enumerators/ProductStatus";
import { Category } from "./Category";
import { Supplier } from "./Supplier";

export interface ProductAttributes {
	id: number;
	name: string;
    barcode: string;
    price: number;
    costPrice: number;
    description: string;
    quantity: number;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes>{
    public id!: number;
    public name!: string;

    public barcode: string;
    public price: number;
    public costPrice: number;
    public description: string;
    public quantity: number;
    
    public status?: ProductStatus;
    
    public category?: Category;
    public supplier?: Supplier;

    public addCategory!: HasOneCreateAssociationMixin<Category>;
    public getCategory!: HasOneGetAssociationMixin<Category>;
    public addSupplier!: HasOneCreateAssociationMixin<Supplier>;
    public getSupplier!: HasOneGetAssociationMixin<Supplier>;

    public static associations: {
		products: Association<Product, Category>,
		supplier: Association<Supplier, Category>,
	};
}