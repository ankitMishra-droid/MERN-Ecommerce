import { AddToCart } from "../../models/addToCart.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const countAddToCartProduct = asyncHandler( async(req,res) => {
    try {
        
        const userId = req.user?.id

        // console.log(userId)
        const count = await AddToCart.countDocuments({
            userId
        })
        
        // console.log(count)
        return res.status(200).json(
            new ApiResponse(201, { data: count }, "Cart Updated!")
        )
    } catch (error) {
        res.status(401).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
})

export default countAddToCartProduct