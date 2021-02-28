import { initSequelize } from "@helpers/database/sequelize";
import { Association, DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model, Optional } from "sequelize";
import { Role } from "../enumerators/Role";
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

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

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

export const initUser = () => {
	User.init(
		{
			id: {
				type: DataTypes.INTEGER.UNSIGNED,
				autoIncrement: true,
				primaryKey: true
			},
            name: {
                type: DataTypes.STRING
            },
            username:{
                type: DataTypes.STRING
            },
            email:{
                type: DataTypes.STRING
            },
            password:{
                type: DataTypes.STRING
            },
            role:{
                type: DataTypes.ENUM({values: Object.keys(Role)})
            }
		},
		{
			tableName: "User",
			timestamps: false,
      		paranoid: true,
			sequelize: initSequelize()
		}
	);
}

export const associateUser = () => {
	User.hasMany(Order);
};