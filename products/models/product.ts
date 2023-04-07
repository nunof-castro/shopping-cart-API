import mongoose, {Schema, Document} from "mongoose"

export interface IProduct extends Document{
    name:string;
    price:number;
}

const productSchema = new Schema({
    name:{type:String, required:true},
    price:{type:Number, required:true},

})

export default mongoose.model<IProduct>('Product', productSchema)