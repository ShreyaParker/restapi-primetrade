import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
dotenv.config()

const app = express()

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/task",taskRoutes)
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.get('/',(req,res)=>res.send("Api is running"));

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({message: "Somthing broke!"});
})

export default app;
