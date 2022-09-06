import { NextFunction, Request, Response } from "express";
import jwt_decode from "jwt-decode";

async function customerMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    //Decoding User Data (ID and Contact Number) from Auth Token
    const Token: any = req.headers.authorization;
    req.user = jwt_decode(Token);
    next();

  } catch (error) {
    return res.json({
      msg: "Invalid Token",
    });
  }
}

export default customerMiddleWare;
