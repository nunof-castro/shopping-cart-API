import {Item} from "../model/item.model";
import {Cart} from "../model/cart.model";
import {Request, Response} from "express";
import { AppDataSource } from "../data-source"
import axios from "axios"
import "reflect-metadata"



export const addItem = async(req:Request, res:Response):Promise<void | Response>=>{
    const {productId, quantity} = req.body;    
    const {cartId} = req.params

    if(!cartId){
        return res.status(400).send("No cart id provided!")        
    }

    if(!productId || productId.length===0){
        return res.status(400).send("ProductId is required")
    }else if(!quantity || productId<=0){
       return res.status(400).send("Insert Product Quantity")
    }

    try {
        const itemRepository=AppDataSource.getRepository(Item)
        const cartRepository = AppDataSource.getRepository(Cart);
        
        const cart = await cartRepository.findOneBy({
            id: parseInt(cartId),
        });  

        //check if the cart exists
        if(!cart){
            return res.status(404).send(`No cart with id ${cartId}`)
        }

        try{
            const product = await axios.get(`http://localhost:8080/products/${productId}`)

            if(product){
                const newItem = new Item()
                newItem.productId=productId,
                newItem.cartId=parseInt(cartId),
                newItem.price= product.data.price * quantity,
                newItem.quantity=quantity 

                cart.totalPrice+=newItem.price
                cart.totalQuantity+=1 //the cart quantity increase per item and not per item quantity

                await cartRepository.save(cart)
               await itemRepository.save(newItem)
               return res.status(201).send("Item was add to the cart with success!")
            }

        }catch(error:any){                
            return res.status(400).send(error.response.data);
        }
    } catch (error) {      
        console.log(error);        
        return res.status(500).send('Error adding item to cart');
    }

}

export const removeItem = async(req:Request, res:Response):Promise<void | Response>=>{
    const {cartId, productId} = req.params;    
    const parsedCartId = parseInt(cartId)
    const cartRepository = AppDataSource.getRepository(Cart);
    const itemRepository = AppDataSource.getRepository(Item);


    try {
        const cart = await cartRepository.createQueryBuilder("cart")
        .leftJoinAndSelect("cart.products", "product")
        .where("cart.id = :id", { id: req.params.cartId })
        .getOne();

        //check if the cart exists
        if(!cart){
            return res.status(404).send(`No cart with id ${cartId}`)
        }

        if(cart.products.length===0){
            return res.status(400).send(`Cart is empty!`)
        }

        const indexToRemove = cart.products.findIndex(item=>item.productId===productId && item.cartId===parsedCartId)


        if(indexToRemove!==-1){
            const item = await itemRepository.findOneBy({ 
                cartId:parsedCartId,
                productId
             });

             cart.totalPrice-=cart.products[indexToRemove].price*cart.products[indexToRemove].quantity
             cart.totalQuantity-=1 //the cart quantity increase per item and not per item quantity
             cart.products.splice(indexToRemove,1)
             
            if (item) {
                await itemRepository.remove(item);  
            }   
                     
            await cartRepository.save(cart)
            return res.send("Item removed from cart successfully");
        }
    
    
      } catch (error) {
        console.log(error);
        return res.status(500).send("Error removing item from cart");
      }
}


export const getCartById = async (req: Request, res: Response) => {
    const { cartId } = req.params;

    try {
      const cartRepository = AppDataSource.getRepository(Cart);
      const cart = await cartRepository.createQueryBuilder("cart")
      .leftJoinAndSelect("cart.products", "product")
      .where("cart.id = :id", { id: req.params.cartId })
      .getOne();
  
      if (!cart) {
        return res.status(404).send(`No cart with id ${cartId}`);
      }
  
      return res.status(200).json(cart);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Error retrieving cart");
    }
  };

