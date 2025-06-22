import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()



//common middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(cookieParser())
app.use(express.static("public"))

// import routes
import healthCheckRoutes from "./routes/health-check.routes.ts"



// routes
app.use("/api/v1/health-check", healthCheckRoutes)

export {
    app
}