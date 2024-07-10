import { AddToCart } from "../../models/addToCart.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const updateAddToCartItemProduct = asyncHandler( async (req, res) => {
    try {
        const currentUser = req.user?._id;
        const addToCartProductId = req?.body?._id;
        // const { productId } = req?.body
        const qty = req.body.quantity

        console.log("addToCartProductId: ", addToCartProductId)
        console.log("qty: ", qty)
        console.log("currentUser: ", currentUser)

        const updateCartItem = await AddToCart.updateOne({_id: addToCartProductId}, {
            ...(qty && {quantity: qty})
        })

        return res.status(200).json(
            new ApiResponse(201, updateCartItem, "Cart Item Updated Succesfully!")
        )
    } catch (error) {
        res.status(400).json(
            new ApiError(401, "somthing went wront", error)
        )
    }
})

export default updateAddToCartItemProduct;