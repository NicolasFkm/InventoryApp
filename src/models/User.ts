import { Association, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model, Optional, Sequelize } from "sequelize";
import { Role } from "@enumerators/Role";
import { Order } from "./Order";
import { Product } from "./Product";

export interface UserAttributes {
	id: number;
	name: string;
    username: string;
    email: string;
    password: string;
    role: Role;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

export class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: number;
    public name!: string;
    public username!: string;
    public email!: string;
    public password!: string;

    public role?: Role;
    public orders?: Order[];
    
    public createOrder!: HasManyAddAssociationMixin<Order, number>;
    public getOrders!: HasManyGetAssociationsMixin<Order>;

    public static associations: {
		orders: Association<Order, User>;
		products: Association<Product, User>;
	};
}

export const initUser = (sequelize: Sequelize) => {
	User.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false
            },
            role:{
                type: DataTypes.ENUM({values: Object.keys(Role)})
            }
		},
		{
			tableName: "User",
			timestamps: false,
      		paranoid: true,
			sequelize: sequelize
		}
	);
}

export const associateUser = () => {
	User.hasMany(Order);
};