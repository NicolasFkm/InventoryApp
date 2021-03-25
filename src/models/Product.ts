import { Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyGetAssociationsMixin, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, Model, Optional, Sequelize } from "sequelize";
import { ProductStatus } from "@enumerators/ProductStatus";
import { Category } from "./Category";
import { Order } from "./Order";
import { OrderProduct } from "./OrderProduct";
import { Supplier } from "./Supplier";
import { Purchase } from "./Purchase";
import { PurchaseProduct } from "./PurchaseProduct";

export interface ProductAttributes {
	id: number;
	name: string;
    barcode?: string;
    price: number;
    costPrice: number;
    description?: string;
    quantity: number;
    status?: ProductStatus;

}

export interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> { }

export class Product extends Model{
    public id!: number;
    public name!: string;

    public barcode?: string;
    public price: number;
    public costPrice: number;
    public description: string;
    public quantity: number;
    
    public status?: ProductStatus;
    
    public category?: Category;
    public supplier?: Supplier;
    public purchases?: Purchase[];
    public orders?: Order[];

    public getCategory!: HasOneGetAssociationMixin<Category>;
    public getSupplier!: HasOneGetAssociationMixin<Supplier>;
    public getPurchases!: HasManyGetAssociationsMixin<Purchase>;

    public static associations: {
		orders: Association<Order, Product>,
		category: Association<Category, Product>,
		supplier: Association<Supplier, Product>,
		purchases: Association<Purchase, Product>,
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
                allowNull: true
            },
            price: {
                type: DataTypes.DECIMAL
            },
            costPrice: {
                type: DataTypes.DECIMAL
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            status: {
                type: DataTypes.ENUM({ values: Object.keys(ProductStatus) }),
                defaultValue: 0
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
	Product.belongsToMany(Purchase, {through: typeof PurchaseProduct});
	Product.belongsTo(Category);
	Product.belongsTo(Supplier);
};