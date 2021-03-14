
// import DepositController from "@controllers/DepositController";
// import LoginController from "@controllers/LoginController";
// import PaymentController from "@controllers/PaymentController";
// import WithdrawController from "@controllers/WithdrawController";
import UserController from "@controllers/UserController";
import { Request, Response, Application } from "express";

export class Routes {
//   public loginController: LoginController = new LoginController();
  public userController: UserController = new UserController();
//   public depositController: DepositController = new DepositController();
//   public withdrawController: WithdrawController = new WithdrawController();
//   public paymentController: PaymentController = new PaymentController();

  public map(app: Application): void {
    // app.route("/login").post(this.loginController.postAuthenticate);
    
    app.route("/user").post(this.userController.postCreate);
    app.route("/user").get(this.userController.getAll);
    app.route("/user/:id").get(this.userController.getById);
    // app.route("/account/:id/payment").get(this.accountController.getPayments);
    // app.route("/account/:id/withdraw").get(this.accountController.getWithdrawals);
    // app.route("/account/:id/deposit").get(this.accountController.getDeposits);
    
    // app.route("/payment/:id").get(this.paymentController.getById);
    // app.route("/payment").post(this.paymentController.postCreate);
    
    // app.route("/withdraw/:id").get(this.withdrawController.getById);
    // app.route("/withdraw").post(this.withdrawController.postCreate);
    
    // app.route("/deposit/:id").get(this.depositController.getById);
    // app.route("/deposit").post(this.depositController.postCreate);
  }
}