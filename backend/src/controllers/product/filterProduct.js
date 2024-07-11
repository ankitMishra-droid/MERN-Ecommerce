import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { Product } from "../../models/product.model.js"

const filterProduct = asyncHandler( async(req, res) => {
    try {
        const categoryList = req?.body?.category

        const product = await Product.find({
            category : {
                "$in" : categoryList
            }
        })

        return res.status(200).json(
            new ApiResponse(201, product, "Category Filtered!")
        )
    } catch (error) {
        res.status(400).json(
            new ApiError(401, 'somthing went wrong', error?.message || error)
        )
    }
})

export default filterProduct