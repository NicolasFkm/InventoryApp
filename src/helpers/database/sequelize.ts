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
import { associatePurchaseProduct, initPurchaseProduct } from "@models/PurchaseProduct";
import { associatePurchase, initPurchase } from "@models/Purchase";

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

export const configDB = (sequelize: Sequelize) => {
    initCategory(sequelize);
    initCoupon(sequelize);
    initOrder(sequelize);
    initOrderProduct(sequelize);
    initPayment(sequelize);
    initProduct(sequelize);
    initSupplier(sequelize);
    initUser(sequelize);
    initPurchase(sequelize);
    initPurchaseProduct(sequelize);
    associateCategory();
    associateCoupon();
    associateOrder();
    associateOrderProduct();
    associatePayment();
    associateProduct();
    associateSupplier();
    associateUser();
    associatePurchase();
    associatePurchaseProduct();
}
