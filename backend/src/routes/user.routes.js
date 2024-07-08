import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { changePassword, getCuurentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateDetails } from "../controllers/users/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import fetchAllUsers from "../controllers/users/allUsersController.js";
import { getAllProducts, getCategoryProduct, getCategoryWiseProduct, getProductDetails, updateProductDetails, uploadProduct } from "../controllers/product/uploadProduct.controller.js";
import addToCartProduct from "../controllers/users/addToCart.js";
import countAddToCartProduct from "../controllers/users/countAddToCartProduct.js";
import addToCartProductView from "../controllers/users/addToCatrProductView.js";

const router = Router()

router.route('/register').post(upload.fields([{name: "profilePic", maxCount: 1}]), registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route('/refreshToken').post(refreshAccessToken)
router.route('/change-password').post(verifyJwt, changePassword)
router.route("/update-profile").patch(verifyJwt, updateDetails)
router.route("/get-current-user").get(verifyJwt, getCuurentUser)
router.route("/all-users").get(verifyJwt, fetchAllUsers)

// product details
router.route("/upload-product").post(verifyJwt, uploadProduct)
router.route("/get-products").get(getAllProducts)
router.route("/update-product").patch(updateProductDetails)
router.route("/get-category").get(getCategoryProduct)
router.route("/categorywise-product").post(getCategoryWiseProduct)
router.route("/product-details").post(getProductDetails)
router.route("/add-to-cart").post(verifyJwt, addToCartProduct)
router.route("/updateCart").get(verifyJwt, countAddToCartProduct)
router.route("/cartProduct").get(verifyJwt, addToCartProductView)

export default router;