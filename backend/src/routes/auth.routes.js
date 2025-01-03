import express from "express"
import {
    SignUp, LogIn, LogOut,
    CheckAuth,
    updateProfile,
} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
// import { updateProfile } from "../controllers/user.controller.js"


const router = express.Router()

router.post("/signup", SignUp)
router.post("/login", LogIn)
router.post("/logout", LogOut)
router.patch("/users/:id", protectRoute,
    updateProfile
)

router.get("/check", protectRoute, CheckAuth)

export default router