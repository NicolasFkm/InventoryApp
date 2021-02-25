import { Association, HasManyAddAssociationMixin, HasManyGetAssociationsMixin, Model, Optional } from "sequelize";
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
    public products?: Product[];

    public createProduct!: HasManyAddAssociationMixin<Product, number>;
    public getProducts!: HasManyGetAssociationsMixin<Product>;
    public createOrder!: HasManyAddAssociationMixin<Order, number>;
    public getOrders!: HasManyGetAssociationsMixin<Order>;

    public static associations: {
		orders: Association<Order, User>;
		products: Association<Product, User>;
	};
}