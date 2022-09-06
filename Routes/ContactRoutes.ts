import express from 'express';
import * as ContactControllers from "../Controllers/ContactControllers";
import authMiddleware from "../middleware/checkAuth";
import UserMiddleWare from "../middleware/getUser";

const router = express.Router()

// router.get(`/Index`,authMiddleware, UserMiddleWare, ContactControllers.getContacts);
router.get(`/Index`, ContactControllers.getContacts);

router.post(`/CreateContact`, ContactControllers.CreateContact)

router.put(`/UpdateContact/:ContactID`, ContactControllers.updateContact)

router.delete(`/DeleteContact/:ContactID`, ContactControllers.deleteContact)





export default router;