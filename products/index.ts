import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import products from "./routes/index"

dotenv.config()
const app = express();

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("PRODUCTS API");
});

app.use("/products", products)

mongoose.connect('mongodb://localhost:27017/shopping-cart').then(()=>{console.log("Connected to mongo database");
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
} ).catch((err)=>console.log("Something went worng", err)
)