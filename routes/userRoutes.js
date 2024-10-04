import express from "express";
import { editUser, getUsers, loginUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/edit-user").put(protect,editUser)

router.route("/get-all-users").get(protect,getUsers)


export default router;