import mongoose, { Schema } from "mongoose";

const addToCartModel = new Schema({
    productId: {
        ref: 'Product',
        type: String
    },
    quantity: Number,
    userId: String
},
{
    timestamps: true
})

export const AddToCart = mongoose.model("addtocart", addToCartModel)