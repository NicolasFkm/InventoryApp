import { Sequelize } from "sequelize";
import * as path from 'path';
import { associateCategory, initCategory } from "@models/Category";
import { associateCoupon, initCoupon } from "@models/Coupon";
import { associateOrder, initOrder } from "@models/Order";
import { associateOrderProduct, initOrderProduct } from "@models/OrderProduct";
import { associatePayment, initPayment } from "@models/Payment";
import { associateProduct, initProduct } from "@models/Product";
import { associateSupplier, initSupplier } from "@models/Supplier";
import { associateUser, initUser } from "@models/User";

export const initSequelize = ()=>{
    const databasePath = path.join(__dirname, process.env.DATABASE_NAME!);
    
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: databasePath,
        logging: (...msg) => console.log(`[SEQUELIZE] ${msg}`),
        pool: {
            max: 5,
            min: 0,
            idle: 15000,
            acquire: 20000
        }
    });
    
    return sequelize;
};

export const configDB = () => {
    initCategory();
    initCoupon();
    initOrder();
    initOrderProduct();
    initPayment();
    initProduct();
    initSupplier();
    initUser();
    associateCategory();
    associateCoupon();
    associateOrder();
    associateOrderProduct();
    associatePayment();
    associateProduct();
    associateSupplier();
    associateUser();
}
