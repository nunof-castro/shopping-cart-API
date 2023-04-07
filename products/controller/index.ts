import Product, {IProduct} from "../models/product"
import {Request, Response} from "express"

export const getAll = async (req:Request, res:Response):Promise<void>=>{
    const products:IProduct[] = await Product.find({})

    if(products.length===0){
        res.status(404).json("No products found!")
    }

    res.status(200).json(products)
}

export const getById = async (req:Request, res:Response):Promise<void>=>{
    const{params}=req    

    try{
        const product:IProduct | null = await Product.findById(params.id)    

        if(product){
            res.status(200).json(product)
        }else{        
            res.status(404).json(`Product with id: ${params.id} not found`) 
        }    
    }catch(err){
        res.status(500).json(err)
    }    
}