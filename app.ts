import express from 'express';
import { NextFunction, Request, Response } from "express";
import bodyParser from 'body-parser';
import ContactRoutes from "./Routes/ContactRoutes"
import sequelize from 'sequelize'
import UserRoutes from "./Routes/UserRoutes"
import cors from 'cors'

const app = express();
const port = 4000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(function(req:Request,res:Response, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 1);
  next();
})

//To Handle URLs
app.use(`/`, ContactRoutes)
app.use(`/`, UserRoutes)
console.log("Hehe")
//Server

// sequelize
//       .sync()
//       .then(app.listen(4000))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})