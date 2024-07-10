import { AddToCart } from "../../models/addToCart.model.js";
import { Product } from "../../models/product.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const searchProduct = asyncHandler( async(req, res) => {
    try {
        const query = req.query.q

        const regex = new RegExp(query, 'i', 'g')

        const findProduct = await Product.find({
            "$or" : [
                {
                    productName: regex
                },
                {
                    category: regex
                },
                {
                    brandName: regex
                }
            ]
        })

        return res.status(200).json(
            new ApiResponse(201, findProduct, "product fetched")
        )
    } catch (error) {
        res.status(400).json(
            new ApiError(401, "somthing went wrong", error[{
                error: error?.message || error
            }])
        )
    }
})

export default searchProduct