import mongoose, {Schema} from "mongoose"

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    brandName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    selling: {
        type: String,
        required: true
    },
    productImg: [],
    category: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

export const Product = mongoose.model("Product", productSchema)