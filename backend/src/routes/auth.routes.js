import express from "express"
import { LogIn, LogOut, SignIn, updateProfile } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"


const router = express.Router()

router.post("/signup", SignIn)
router.post("/login", LogIn)
router.post("/logout", LogOut)

router.put("/update-profile", protectRoute, updateProfile);

export default router