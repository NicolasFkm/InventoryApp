import { Association, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model, Optional, Sequelize } from "sequelize";
import { PurchaseProduct } from "./PurchaseProduct";
import { Payment } from "./Payment";
import { Product } from "./Product";

export interface PurchaseAttributes {
	id: number;
    payments?: Payment[]|null;
    products?: Product[]|null;
}

export interface PurchaseCreationAttributes extends Optional<PurchaseAttributes, "id"> { }

export class Purchase extends Model<PurchaseAttributes, PurchaseCreationAttributes>{
    public id!: number;

    public payments?: Payment[];
    public products?: Product[];

    public addProduct!: HasManyAddAssociationMixin<Product, number>;
    public getProducts!: HasManyGetAssociationsMixin<Product>;
    public addPayment!: HasManyAddAssociationMixin<Payment, number>;
    public getPayments!: HasManyGetAssociationsMixin<Payment>;

    public static associations: {
		products: Association<Product, Purchase>,
		payment: Association<Payment, Purchase>
	};
}

export const initPurchase = (sequelize: Sequelize) => {
	Purchase.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			}
		},
		{
			tableName: "Purchase",
			timestamps: false,
      		paranoid: true,
			sequelize: sequelize
		}
	);
}

export const associatePurchase = () => {
    Purchase.hasMany(Payment);
    Purchase.belongsToMany(Product, {through: typeof PurchaseProduct});
};