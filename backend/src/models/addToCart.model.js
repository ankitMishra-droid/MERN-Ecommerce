import mongoose, { Schema } from "mongoose";

const addToCartModel = new Schema({
    productId: {
        ref: 'product',
        type: String
    },
    quantity: Number,
    userId: String
},
{
    timestamps: true
})

export const AddToCart = mongoose.model("addtocart", addToCartModel)