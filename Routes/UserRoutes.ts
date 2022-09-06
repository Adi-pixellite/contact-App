import express from 'express';
import * as UserControllers from "../Controllers/UserController";


const router = express.Router()

router.post(`/SignUp`,UserControllers.signup);

router.post(`/Login`, UserControllers.login)

export default router;