import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { User } from "../../models/UserModel.js";

const fetchAllUsers = asyncHandler( async(req, res) => {
    try {
        // console.log("userId user fetched: ", req.user._id)

        const allUsers = await User.find()

        return res.status(200).json(
            new ApiResponse(201, allUsers , "all user fetched")
        )
    } catch (error) {
        req.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
})

export default fetchAllUsers