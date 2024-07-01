import { asyncHandler } from "../utils/asyncHandler.js"
import { Product } from "../models/product.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import uploadProductPermission from "../helpers/uploadProductPermission.js";

const uploadProduct = asyncHandler( async(req,res) => {
    try {

        const sessionId = req.user?._id;

        if(!uploadProductPermission(sessionId)){
            throw new Error("Permission Denied!")
        }

        const uploadProductDetails = new Product(req.body)
        if(!uploadProductDetails){
            throw new Error("All field are required.")
        }
        const saveProduct = await uploadProductDetails.save()

        res.status(201).json(
            new ApiResponse(201, saveProduct, "Product uploaded!")
        )
    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
})

const getAllProducts = asyncHandler( async(req, res) => {
    try {
        const getProduct = await Product.find().sort({ createdAt: -1 }) 

        res.status(201).json(
            new ApiResponse(201, getProduct, "All product fetched")
        )
    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
})

const updateProductDetails = asyncHandler( async(req, res) => {
    try {
        const { _id, productName, brandName, productDescription, productPrice, selling, category, productImg } = req.body;

        const userId = req.user?._id;

        if(!uploadProductPermission(userId)){
            throw new Error("Permission denied!")
        }

        const updateDetails = await Product.findByIdAndUpdate(_id, 
            {
                $set:{
                    productName: productName, brandName: brandName, productDescription: productDescription, productPrice: productPrice,
                    selling: selling, category: category, productImg: productImg
                }
            },
            {
                new: true
            }
        )

        return res
        .status(200)
        .json( new ApiResponse(201, updateDetails, "Product Details Updated!"))

    } catch (error) {
        res.status(400).json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
})

export { uploadProduct, getAllProducts, updateProductDetails }