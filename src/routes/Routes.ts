import CartController from "@controllers/CartController";
import ErrorHandler from "@middlewares/ErrorHandler";
import LoginController from "@controllers/LoginController";
import PaymentController from "@controllers/PaymentController";
import ProductController from "@controllers/ProductController";
import PurchaseController from "@controllers/PurchaseController";
import SupplierController from "@controllers/SupplierController";
import UserController from "@controllers/UserController";
import { Request, Response, Application } from "express";
import CategoryController from "@controllers/CategoryController";

export class Routes {
  public loginController: LoginController = new LoginController();
  public userController: UserController = new UserController();
  public purchaseController: PurchaseController = new PurchaseController();
  public categoryController: CategoryController = new CategoryController();
  public supplierController: SupplierController = new SupplierController();
  public productController: ProductController = new ProductController();
  public paymentController: PaymentController = new PaymentController();
  public cartController: CartController = new CartController();
  public errorHandler: ErrorHandler = new ErrorHandler();

  public map(app: Application): void {
    app.route("/login").post(this.loginController.postAuthenticate);

    app.route("/user").post(this.userController.postCreate);
    app.route("/user").get(this.userController.getAll);
    app.route("/user/:id").put(this.userController.putUpdateUser);
    app.route("/user/:id").get(this.userController.getById);
    app.route("/user/:id/cart").get(this.cartController.getByUserId);
    app.route("/user/:id/cart").put(this.cartController.putUpdateCartItem);
    app.route("/user/:id/cart").delete(this.cartController.deleteClearCart);


    app.route("/purchase").post(this.purchaseController.postCreate);
    app.route("/purchase").get(this.purchaseController.getAll);
    app.route("/purchase/:id").get(this.purchaseController.getById);


    app.route("/category").post(this.categoryController.postCreate);
    app.route("/category").get(this.categoryController.getAll);
    app.route("/category/:id").get(this.categoryController.getById);
    app.route("/category/:id").put(this.categoryController.putUpdate);

    app.route("/supplier").post(this.supplierController.postCreate);
    app.route("/supplier").get(this.supplierController.getAll);
    app.route("/supplier/:id").get(this.supplierController.getById);
    app.route("/supplier/:id").put(this.supplierController.putUpdate);

    app.route("/product").post(this.productController.postCreate);
    app.route("/product").get(this.productController.getAll);
    app.route("/product/:id").get(this.productController.getById);
    app.route("/product/:id").put(this.productController.putUpdate);

    app.route("/payment").post(this.paymentController.postCreate);
    app.route("/payment").get(this.paymentController.getAll);
    app.route("/payment/:id").get(this.paymentController.getById);

    app.use("*", this.errorHandler.handleInvalidRoute);
    app.use("*", this.errorHandler.handleError);
  }
}