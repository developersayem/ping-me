import { Router } from "express";
import { userRegistrationController } from "../controller/users.controller.ts";



const router = Router()

router.route("/register").post(userRegistrationController)

export default router