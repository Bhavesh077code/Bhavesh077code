
import express from "express";
import { userRegister } from "../controller/userRegisterController.js";
import { userLogin} from "../controller/userLoginController.js";

const router = express.Router();


router.post("/register", userRegister);
router.post("/login", userLogin);

export default router