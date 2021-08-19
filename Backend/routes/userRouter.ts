import {
  Request,
  Response,
  Application,
  Router,
  NextFunction,
  response,
  request
} from "express";
import { user } from "../types/userType";
import { UserHelper } from "../helper/userHelper";
import jwt from "jsonwebtoken";
import { SECRET } from "../jwtSecret";
import { User } from "../models/userModel";

export class UserRouter {
  public router: Router;
  public UserHelper: UserHelper;
  public usernamesArray: string[] = [];

  constructor() {
    this.router = Router();
    this.UserHelper = new UserHelper();
    console.log("In constructor of userRouter.ts");
  }

  CreateUser: any = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const user: user = request.body;
    console.log("User from request body in userRouter is ", user);
    try {
      const newuser = await this.UserHelper.createUsers(user);
      return response.status(200).json({
        status: "success",
        message: "User Created Successfully"
      });
    } catch (ex) {
      console.log(ex);
      return response.status(400).json(ex);
    }
  };

  Login: any = async (request: Request, response: Response) => {
    const loginCredentials: any = request.body;
    try {
      console.log("Request URL is " + request.url);
      const loggedInUser = await this.UserHelper.loginUser(loginCredentials);
      console.log("LoggedIn User is ", loggedInUser);
      const token = jwt.sign("loggedInUser", SECRET.secret);
      return response.status(200).json({
        status: "success",
        data: loggedInUser,
        token: token
      });
    } catch (error) {
      return response.status(400).json({
        status: "failed",
        error: error
      });
    }
  };

  async GetAllUserNames(): Promise<void> {
    try {
      const allUsernames = await this.UserHelper.allUsernames();
      await allUsernames.forEach((element: { dataValues: { userName: string; }; }) => {
        if (!this.usernamesArray.includes(element.dataValues.userName)) {
          this.usernamesArray.push(element.dataValues.userName);
        }
      });
      // console.log("username array POPULATED");
      // console.log(this.usernamesArray);
    }
    finally {
      console.log("username array function is complete");
    }
  }

  CheckUsernameAvailability: any = async (request: Request, response: Response) => {
    await this.GetAllUserNames();
    const enteredName = request.body
    console.log("Entered Username is ", enteredName)
    try {
      if (this.usernamesArray.includes(enteredName.username)) {
        return response.status(200).json({
          status: "success",
          data: false,
        });
      }

      else {
        return response.status(200).json({
          status: "success",
          data: true,
        });
      }
    } catch (error) {
      return response.status(400).json({
        message: "Failure",
        error: error
      })
    }
  }

  routes(app: Application) {
    app.route("/signup").post(this.CreateUser);
    app.route("/login").post(this.Login);
    app.route("/username").post(this.CheckUsernameAvailability);
  }
}
