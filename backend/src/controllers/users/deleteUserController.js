import { User } from "../../models/UserModel.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.body?._id;

    const user = await User.findByIdAndDelete({_id: userId});

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .json(new ApiResponse(200, user, "user deleted!"));
  } catch (error) {
    return res.status(400).json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
});

export default deleteUser;
