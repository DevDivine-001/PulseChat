import express from "express"

const router = express.Router()

router.get("/signup", (req, res) => {
    res.send("signup router")
})
router.get("/login", (req, res) => {
    res.send("login router")
})
router.get("/logout", (req, res) => {
    res.send("login router")
})

export default router