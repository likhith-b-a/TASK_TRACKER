import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));


import userRoutes from "./routes/userRoutes.js"

app.use("/",userRoutes);

//67a917e86d08150210236c4f
//67a917e86d08150210236c50

export default app;