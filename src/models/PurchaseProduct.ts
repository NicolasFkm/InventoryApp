import { Association, DataTypes, Model, Sequelize } from "sequelize";
import { Optional } from "sequelize";
import { Purchase } from "./Purchase";
import { Product } from "./Product";

export interface PurchaseProductAttributes {
    id: number;
    quantity: number;
}

export interface PurchaseProductCreationAttributes extends Optional<PurchaseProductAttributes, "id"> { }

export class PurchaseProduct extends Model<PurchaseProductAttributes, PurchaseProductCreationAttributes>{
    public id: number;
    public quantity: number;

    public product!: Product;
    public purchase!: Purchase;

    public static associations: {
        product: Association<Product, PurchaseProduct>,
        purchase: Association<Purchase, PurchaseProduct>
    }
}

export const initPurchaseProduct = (sequelize: Sequelize) => {
    PurchaseProduct.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            quantity: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: "PurchaseProduct",
            timestamps: false,
            paranoid: true,
            sequelize: sequelize
        }
    );
}

export const associatePurchaseProduct = () => {
    PurchaseProduct.belongsTo(Purchase);
    PurchaseProduct.belongsTo(Product);
};