import { initSequelize } from "@helpers/database/sequelize";
import { Optional, Model, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, DataTypes, Sequelize } from "sequelize";
import { Product } from "./Product";

export interface SupplierAttributes {
	id: number;
	name: string;
    address?: string;
}

export interface SupplierCreationAttributes extends Optional<SupplierAttributes, "id"> { }

export class Supplier extends Model<SupplierAttributes, SupplierCreationAttributes> {
    public id!: number;
    public name: string;
    public address?: string;

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