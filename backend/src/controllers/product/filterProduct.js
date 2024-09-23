import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Product } from "../../models/product.model.js";

const filterProduct = asyncHandler(async (req, res) => {
    const { category: categoryList } = req.body;

    if (!categoryList || !Array.isArray(categoryList)) {
        return res.status(400).json(
            new ApiResponse(400, null, "Invalid or missing category list")
        );
    }

    try {
        const products = await Product.find({
            category: { "$in": categoryList }
        });

        return res.status(200).json(
            new ApiResponse(200, products, "Categories filtered successfully")
        );
    } catch (error) {
        return res.status(500).json(
            new ApiResponse(500, null, error.message || "Something went wrong")
        );
    }
});

export default filterProduct;
