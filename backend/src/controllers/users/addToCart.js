import { AddToCart } from "../../models/addToCart.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


const addToCartProduct = asyncHandler( async(req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req?.user?.id;

        // console.log(productId)
        // console.log(currentUser)

        const isProductAvailabel = await AddToCart.findOne({ productId, userId: currentUser })

        if(isProductAvailabel){
            res.json({
                message: "Already existed in cart!",
                error: true,
                success: false
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser
        }

        const newAddtoCart = new AddToCart(payload)
        const saveProduct = await newAddtoCart.save()

        return res.status(200).json(
            new ApiResponse(201, saveProduct, "Product added in cart!")
        )
    } catch (error) {
        res.status(401).json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
})

export default addToCartProduct