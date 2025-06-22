import { Router } from "express";
import { userRegistrationController } from "../controller/users.controller.ts";
import { upload } from "../middlewares/multer.middlewares.ts";



const router = Router()

router.route("/register").post(
    upload.fields([{ name: "avatar", maxCount: 1 }]),
    userRegistrationController)

export default router