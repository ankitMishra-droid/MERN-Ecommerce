import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import {AddToCart} from "../../models/addToCart.model.js"

const addToCartProductView = asyncHandler( async(req,res) => {
    try {
        const currentUser = req.user?._id;

        const allProduct = await AddToCart.find({
            userId : currentUser
        }).populate("productId")

        return res.status(200).json(
            new ApiResponse(201, allProduct, "All Product Fetched from Add TO Cart!")
        )
    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
})

export default addToCartProductView