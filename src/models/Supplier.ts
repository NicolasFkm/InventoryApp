import { Optional, Model, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, DataTypes, Sequelize } from "sequelize";
import { Product } from "./Product";

export interface SupplierAttributes {
	id: number;
	name: string;
    address?: string;
	city?: string;
	state?: string;
	zipCode?: string;
}

export interface SupplierCreationAttributes extends Optional<SupplierAttributes, "id"> { }

export class Supplier extends Model {
    public id!: number;
    public name: string;
    public address?: string;
    public city?: string;
    public state?: string;
    public zipCode?: string;

    public products?: Product[];

    public addProduct!: HasManyAddAssociationMixin<Product, number>;
    public getProducts!: HasManyGetAssociationsMixin<Product>;

    public static associations: {
        products: Association<Product, Supplier>
    }
}

export const initSupplier = (sequelize: Sequelize) => {
	Supplier.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
            name: {
                type: DataTypes.STRING
            },
            address:{
                type: DataTypes.STRING
            }
		},
		{
			tableName: "Supplier",
			timestamps: false,
      		paranoid: true,
			sequelize: sequelize
		}
	);
}

export const associateSupplier = () => {
	Supplier.hasMany(Product);
};