import express, {Request, Response} from "express"
import { AppDataSource } from "./data-source"
import cors from "cors"
import cartRoutes from "./routes/cart.routes"
import "reflect-metadata"



const port = process.env.APP_PORT || 8081

AppDataSource.initialize().then(()=>{
    const app=express()

    app.use(cors()) //enable ALL CORS requests (client requests from other domain)
    app.use(express.json())

    app.get("/",(req: Request, res:Response)=>{
        res.json("SHOPPING CART API")
    })

    //routing middleware for cart
    app.use('/carts', cartRoutes)

    app.listen(port, () => {
        console.log(`listen on port ${port}`);
      });
}).catch((err)=>console.log("Something went worng", err))