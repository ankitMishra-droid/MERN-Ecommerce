import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import { fileURLToPath } from "url"
import path, { dirname } from "path"

const app = express();

// console.log(process.env.CORS_ORIGIN)
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";

app.use("/api/users", userRouter);

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.static(path.join(__dirname, "../../frontend/build")))
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../../frontend/build/index.html"))
})

export {app}