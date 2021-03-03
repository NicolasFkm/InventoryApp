import { initSequelize } from "@helpers/database/sequelize";
import { Association, DataTypes, HasManyAddAssociationMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, Model, Optional, Sequelize } from "sequelize";
import { ProductStatus } from "@enumerators/ProductStatus";
import { Category } from "./Category";
import { Order } from "./Order";
import { OrderProduct } from "./OrderProduct";
import { Supplier } from "./Supplier";

export interface ProductAttributes {
	id: number;
	name: string;
    barcode: string;
    price: number;
    costPrice: number;
    description: string;
    quantity: number;
    status?: ProductStatus;
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
    public orders?: Order[];

    public addCategory!: HasOneCreateAssociationMixin<Category>;
    public getCategory!: HasOneGetAssociationMixin<Category>;
    public addSupplier!: HasOneCreateAssociationMixin<Supplier>;
    public getSupplier!: HasOneGetAssociationMixin<Supplier>;

    public static associations: {
		orders: Association<Order, Product>,
		category: Association<Category, Product>,
		supplier: Association<Supplier, Product>,
	};
}

export const initProduct = (sequelize: Sequelize) => {
	Product.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
            name: {
                type: DataTypes.STRING
            },
            quantity: {
                type: DataTypes.INTEGER
            },
            barcode: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            price: {
                type: DataTypes.DECIMAL
            },
            costPrice: {
                type: DataTypes.DECIMAL
            },
            description: {
                type: DataTypes.TEXT
            },
            status: {
                type: DataTypes.ENUM({ values: Object.keys(ProductStatus) })
            }
		},
		{
			tableName: "Product",
			timestamps: false,
      		paranoid: true,
			sequelize: sequelize
		}
	);
}

export const associateProduct = () => {
	Product.belongsToMany(Order, {through: typeof OrderProduct});
	Product.belongsTo(Category);
	Product.belongsTo(Supplier);
};