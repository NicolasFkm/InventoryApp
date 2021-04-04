import LoginController from "@controllers/LoginController";
import PaymentController from "@controllers/PaymentController";
import ProductController from "@controllers/ProductController";
import PurchaseController from "@controllers/PurchaseController";
import SupplierController from "@controllers/SupplierController";
import UserController from "@controllers/UserController";
import { Request, Response, Application } from "express";

export class Routes {
  public loginController: LoginController = new LoginController();
  public userController: UserController = new UserController();
  public purchaseController: PurchaseController = new PurchaseController();
  public supplierController: SupplierController = new SupplierController();
  public productController: ProductController = new ProductController();
  public paymentController: PaymentController = new PaymentController();

  public map(app: Application): void {
    app.route("/").get((req, res) => { return res.send({response: true})});
    app.route("/login").post(this.loginController.postAuthenticate);
    
    app.route("/user").post(this.userController.postCreate);
    app.route("/user").get(this.userController.getAll);
    app.route("/user/:id").put(this.userController.putUpdateUser);
    app.route("/user/:id").get(this.userController.getById);
    
    app.route("/purchase").post(this.purchaseController.postCreate);
    app.route("/purchase").get(this.purchaseController.getAll);
    app.route("/purchase/:id").get(this.purchaseController.getById);

    app.route("/supplier").post(this.supplierController.postCreate);
    app.route("/supplier").get(this.supplierController.getAll);
    app.route("/supplier/:id").get(this.supplierController.getById);

    app.route("/product").post(this.productController.postCreate);
    app.route("/product").get(this.productController.getAll);
    app.route("/product/:id").get(this.productController.getById);
    
    app.route("/payment").post(this.paymentController.postCreate);
    app.route("/payment").get(this.paymentController.getAll);
    app.route("/payment/:id").get(this.paymentController.getById);
  }
}