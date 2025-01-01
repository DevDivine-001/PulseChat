import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import massageRoutes from "./routes/message.routes.js"
import userRouter from "./routes/user.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./Database/db.js"
import cookieParser from "cookie-parser"




dotenv.config()
const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


const Port = process.env.Port

app.use(express.json())
app.use(cookieParser())
app.get("/", (req, res) => {

    res.status(200).json({
        message: "Hello Subscribers!!!!👋👋👋👋 of PulseChat🌟🌟"
    })

})

app.use("/api/deleteuser", userRouter);
app.use("/api/auth", authRoutes)
app.use("/api/massage", massageRoutes)

app.listen(Port, () => {
    console.log("server is running on PORT:  👋👋👋👋👋👋💓" + Port)
    connectDB()
})