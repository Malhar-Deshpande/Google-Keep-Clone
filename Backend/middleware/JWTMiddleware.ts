import jwt from "jsonwebtoken";
import { SECRET } from "../jwtSecret";
import * as express from "express";

export function verifyRequest(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  console.log("In verifyRequest TOKEN ");
  if (request.url == "/login" || request.url == "/signup" || request.url == "/username") {
    next();
  } else {
    try {
      const token: any = request.headers["token"];
      console.log("TOKEN ", token);
      console.log("Verifying Token");
      const verifyToken: any = jwt.verify(token, SECRET.secret);
      console.log("Token Verified. Calling next()");
      next();
    } catch (error) {
      console.log("Token NOT Verified.");
      response.status(401).json({
        status: "failure",
        message: "Protected API",
        data: error
      });
    }
  }
}
