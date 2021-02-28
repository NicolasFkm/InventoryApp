import {initSequelize} from '@helpers/database/sequelize';
import { Optional, HasManyAddAssociationMixin, Model, Association, HasManyGetAssociationsMixin, DataTypes } from "sequelize";
import { Product } from "./Product";

export interface ProductAttributes {
	id: number;
	name: string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> { }

export class Category extends Model<ProductAttributes, ProductCreationAttributes>{
    public id!: number;
    public name!: string;

    public products?: Product[];

    public getProducts: HasManyGetAssociationsMixin<Product>;
    public addProducts: HasManyAddAssociationMixin<Product, number>;

    public static associations: {
		products: Association<Product, Category>,
	};
}

export const initCategory = () => {
	Category.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: new DataTypes.STRING(255),
				allowNull: false,
			}
		},
		{
			tableName: "Category",
			timestamps: false,
      		paranoid: true,
			sequelize: initSequelize()
		}
	);
}

export const associateCategory = () => {
	Category.hasMany(Product);
};