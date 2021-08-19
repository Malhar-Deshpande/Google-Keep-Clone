import express from "express";
import { NoteRouter } from "./routes/noteRouter";
import { UserRouter } from "./routes/userRouter";
import { verifyRequest } from "./middleware/JWTMiddleware";
import cors from "cors";

class App {
  public app: express.Application;
  public useroutes: UserRouter = new UserRouter();
  public noteroutes: NoteRouter = new NoteRouter();

  constructor() {
    console.log("In constructor of app.ts");
    this.app = express();
    this.config();
    this.useroutes.routes(this.app);
    this.noteroutes.routes(this.app);
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(verifyRequest);

  }
}

export default new App().app;
