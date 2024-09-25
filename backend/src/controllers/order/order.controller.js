import { Order } from "../../models/order.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const orderController = asyncHandler( async(req, res) => {
    try {
        const currentUser = req.user?.id;

        const orderList = await Order.find({ userId: currentUser });

        return res.status(200).json(
            new ApiResponse(201, { data: orderList }, "Order List")
        )
    } catch (error) {
        res.status(500).json({
            message: error?.message || error,
            error: true,
            success: false
        })
    }
})

export {orderController}