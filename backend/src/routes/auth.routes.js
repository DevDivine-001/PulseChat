import express from "express"
import {
    SignUp, LogIn, LogOut,
    CheckAuth,
    updateProfile,
} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"


const router = express.Router()

router.post("/signup", SignUp)
router.post("/login", LogIn)
router.post("/logout", LogOut)
router.put("/update-profile/:id", protectRoute,
    updateProfile
),

    router.get("/check", protectRoute, CheckAuth)

export default router