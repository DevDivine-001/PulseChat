import express from "express"
import cors from "cors"
import path from "path"
import authRoutes from "./routes/auth.routes.js"
import massageRoutes from "./routes/message.routes.js"
import userRouter from "./routes/user.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./Database/db.js"
import cookieParser from "cookie-parser"




dotenv.config()

const Port = process.env.Port
const __dirname = path.resolve();

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



app.use(express.json())
app.use(cookieParser())
app.get("/", (req, res) => {

    res.status(200).json({
        message: "Hello Subscribers!!!!👋👋👋👋 of PulseChat🌟🌟"
    })

})

// app.use("/api/delete", userRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRoutes)
app.use("/api/massage", massageRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error Baby';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

app.listen(Port, () => {
    console.log("server is running on PORT:  👋👋👋👋👋👋💓" + Port)
    connectDB()
})
