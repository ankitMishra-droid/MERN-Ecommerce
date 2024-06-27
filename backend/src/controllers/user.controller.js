import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/UserModel.js";
import jwt from "jsonwebtoken"

const generateAccessTokenAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "somthing went wrong while generating access token and refresh token")
    }
}

// Register user
const registerUser = asyncHandler( async (req,res) => {
    try {
        
    const {name, email, password, phone, profilePic} = req.body;

    if([name,email,password, phone].some((field)=> field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    // if(!profilePic){
    //     throw new Error("profile pic is required")
    // }

    const existedUser = await User.findOne({
        $or: [{phone}, {email}]
    })

    if(existedUser){
        if(existedUser.phone === phone){
            throw new Error("user phone number is already existed")
        }else if(existedUser.email === email){
            throw new Error("email is already existed")
        }
    }

    const profilePath = req.files?.profilePic[0]?.path;
    console.log(profilePath)

    if (!profilePath){
        throw new ApiError(400, "profile picture is required")
    }

    const profile = await uploadOnCloudinary(profilePath)

    if(!profile) {
        throw new ApiError(400, "profile picture is required")
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        profilePic: profile?.url
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "somthing went wrong while registering")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )
    } catch (error) {
     res.json(
        // new ApiError(401, { message : error.message || error})
        {
            message: error.message || error,
            error: true,
            success: false
        }
     )       
    }
})

// login user
const loginUser = asyncHandler( async(req, res) => {

    try {
        
        const {email, password} = req.body;

        if(!email){
            throw new Error("please enter valid email")
        }

        if(!password){
            throw new Error("please enter password")
        }

        const user = await User.findOne({email})

        if(!user){
            throw new Error("User doesn't exist!")
        }

        const isPasswordValid = await user.isPasswordCorrect(password)

        if(!isPasswordValid){
            throw new Error("Password was wrong")
        }

        const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        const option = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "Login Successfully!"
            )
        )
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
})

// logout user
const logoutUser = asyncHandler(async(req, res) => {
    try {
   
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $unset: {
                    refreshToken: 1 // this removes the field from document
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
             
    } catch (error) {
        res.json({
            message: "somthing went wrong while logout" || error,
            error: true,
            success: false
        })
    }
})

// refresh user's access token
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    console.log("Incoming Refresh Token:", incomingRefreshToken);

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        console.log("Decoded Token:", decodedToken);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token expired or used");
        }

        const options = {
            httpOnly: true,
            secure: true
        };

        const { accessToken, newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(201, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed")
            );
    } catch (error) {
        console.error("JWT Verification Error:", error);
        throw new ApiError(500, error?.message || "Invalid refresh token");
    }
});

// change current user password
const changePassword = asyncHandler( async (req, res) => {
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)

    const isPasswordValid = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordValid){
        throw new ApiError(401, "incorrect password")
    }

    if(!oldPassword){
        throw new ApiError(401, "invalid old password")
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(
        new ApiResponse(201, {}, "Password changed successfully")
    )
})

// get current user
const getCuurentUser = asyncHandler( async (req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(201, req.user, "current user fetched successfully")
    )
})

// update user's name, email, phone
const updateDetails = asyncHandler( async(req, res) => {

    const { name, email, phone, role } = req.body;

    const userId = req.user?._id;

    const user = await User.findById(userId)

    // console.log("userId: ", userId, user.role)
    const updateUser = await User.findByIdAndUpdate(
        // req.user?._id,
        userId,
        {
            $set:{
                name: name, phone: phone, email: email, role: role
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json( new ApiResponse(201, updateUser, "User Details Updated!"))

})
export { registerUser, loginUser, logoutUser, refreshAccessToken, changePassword, getCuurentUser, updateDetails }