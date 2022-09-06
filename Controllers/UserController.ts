import { Request, Response } from "express";
import models from "../models/database";

import jwt from "jsonwebtoken";
import config from "../config";
//import config from "../config";
import bcrypt from "bcrypt";


const saltRounds = 10;

export const signup = async (req:Request, res:Response) => {
    const userData = req.body;
    //console.log(userData)
    const checkIfAlreadyExist = await models.users.findOne({
      where: {
        userContactNumber: userData.userContactNumber
      },
    });
  
     if (!checkIfAlreadyExist) {
      //Create Hash
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(userData.userPassword, salt);
    
      //Save into DataBase
      const saveUserData = await models.users.create({
        userFirstName: userData.userFirstName,
        userLastName: userData.userLastName,
        userContactNumber: userData.userContactNumber,
        userPassword: hashedPassword,
    
      });
  
      return res.json({
        message: "Welcome :" + saveUserData.userFirstName,
      });
     } else {
      return res.json({
        message: "A User With Given Contact Number Already Registered With Us",
       });
     }
  };

  //To Login User
export const login = async (req: Request, res: Response) => {
    const loginData = req.body;
    console.log(loginData)
    const originalData: any = await models.users.findOne({
      where: {
        userContactNumber: loginData.userContactNumber,
      },
      raw: true,
    });
  
    if (originalData == null) {
      return res.json({
        msg: "User Not Exist",
      });
    } else {
      const verify = await bcrypt.compare(
        loginData.userPassword,
        originalData?.userPassword
      );
  
      if (verify) {
        const token = jwt.sign(
          {
            userID: originalData?.userID,
            userContactNumber: originalData?.userContactNumber,
          },
          config.secret,
          {
            expiresIn: "1h",
          }
        );
     //   console.log(token);
        res.json({ user: originalData, token: token });
      } else {
        res.json({
          message: "invalid Password",
        });
      }
    }
  };
  




