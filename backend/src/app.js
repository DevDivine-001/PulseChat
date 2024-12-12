import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import massRoutes from "./routes/message.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./Database/db.js"




dotenv.config()
const app = express()
cors(cors())


const Port = process.env.Port

app.use(express.json())
app.get("/", (req, res) => {

    res.status(200).json({
        message: "Hello Subscribers!!!!👋👋👋👋 of PulseChat🌟🌟"
    })

})

app.use("/api/auth", authRoutes)
app.use("/api/mass", massRoutes)

app.listen(Port, () => {
    console.log("server is running on PORT:  👋👋👋👋👋👋💓" + Port)
    connectDB()
})