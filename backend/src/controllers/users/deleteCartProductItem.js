import { AddToCart } from "../../models/addToCart.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const deleteCartProductItem = asyncHandler( async(req, res) => {
    try {
        const currentUser = req.user?._id;
        const addTocartProductId = req?.body?._id;

        const deleteProduct = await AddToCart.deleteOne({
            _id: addTocartProductId
        })

        res.status(200).json(
            new ApiResponse(201, deleteProduct, "Product removed!")
        )
    } catch (error) {
        res.status(400).json(
            new ApiError(401, "somthing went wrong", error[{
                error: error?.message || error
            }])
        )
    }
})

export default deleteCartProductItem