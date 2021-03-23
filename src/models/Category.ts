import { Optional, HasManyAddAssociationMixin, Model, Association, HasManyGetAssociationsMixin, DataTypes, Sequelize } from "sequelize";
import { Product } from "./Product";

export interface CategoryAttributes {
	id: number;
	name: string;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, "id"> { }

export class Category extends Model{
    public id!: number;
    public name!: string;

    public products?: Product[];

    public getProducts: HasManyGetAssociationsMixin<Product>;
    public addProducts: HasManyAddAssociationMixin<Product, number>;

    public static associations: {
		products: Association<Product, Category>,
	};
}

export const initCategory = (sequelize: Sequelize) => {
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
                unique: true
			}
		},
		{
			tableName: "Category",
			timestamps: false,
      		paranoid: true,
			sequelize: sequelize
		}
	);
}

export const associateCategory = () => {
	Category.hasMany(Product);
};