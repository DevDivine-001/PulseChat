import express from "express"
import { LogIn, LogOut, SignIn } from "../controllers/auth.controller.js"


const router = express.Router()

router.post("/signup", SignIn)
router.post("/login", LogIn)
router.post("/logout", LogOut)

export default router