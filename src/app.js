import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// now we can get data in any form, so below is code to get data in those forms
app.use(express.json({limit: "20kb"})) // means express can accept json
app.use(express.urlencoded({extended: true, limit:"20kb"}))
app.use(express.static("public"))// public folder: we keep assets/images/ anything
app.use(cookieParser())

// Routes

import userRouter from './routes/user.routes.js'

// Routes declaration
app.use("/api/v1/users", userRouter)

export {app}