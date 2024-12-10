import express from "express"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"



const app = express()
cors(cors())

app.use("/api/auth", authRoutes)

app.listen(5000, () => {
    console.log("server is running on port 5000 👋👋👋👋👋👋💓")
})