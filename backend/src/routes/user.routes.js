import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import {
    DeleteAccount,
    updateProfile
}
    from "../controllers/user.controller.js"
import { CheckAuth } from "../controllers/auth.controller.js"


const router = express.Router()


router.patch("/update/:id", protectRoute, updateProfile)
router.delete("/delete/:id", protectRoute, DeleteAccount)
// router.delete('/user/:id', protectRoute, DeleteAccount);

router.get("/check", protectRoute, CheckAuth)
export default router