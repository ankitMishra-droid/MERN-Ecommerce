import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { changePassword, forgotPasswordLink, getCuurentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateDetails, userPasswordReset } from "../controllers/users/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import fetchAllUsers from "../controllers/users/allUsersController.js";
import { getAllProducts, getCategoryProduct, getCategoryWiseProduct, getProductDetails, updateProductDetails, uploadProduct } from "../controllers/product/uploadProduct.controller.js";
import addToCartProduct from "../controllers/users/addToCart.js";
import countAddToCartProduct from "../controllers/users/countAddToCartProduct.js";
import addToCartProductView from "../controllers/users/addToCatrProductView.js";
import updateAddToCartItemProduct from "../controllers/users/updateAddToCartItemProduct.js";
import deleteCartProductItem from "../controllers/users/deleteCartProductItem.js";
import searchProduct from "../controllers/product/searchProduct.js";
import filterProduct from "../controllers/product/filterProduct.js";
import orderPayment from "../controllers/order/orderPayment.js";
import deleteUser from "../controllers/users/deleteUserController.js";
import webhooks from "../controllers/order/webhooks.js";
import { orderController } from "../controllers/order/order.controller.js";

const router = Router()

router.route('/register').post(upload.fields([{name: "profilePic", maxCount: 1}]), registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route('/refreshToken').post(refreshAccessToken)
router.route('/change-password').post(verifyJwt, changePassword)
router.route("/update-profile").patch(verifyJwt, updateDetails)
router.route("/get-current-user").get(verifyJwt, getCuurentUser)
router.route("/all-users").get(verifyJwt, fetchAllUsers)
router.route("/send-reset-link").post(forgotPasswordLink)
router.route("/:userId/:token").post(userPasswordReset)

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
router.route('/updateCartItem').post(verifyJwt, updateAddToCartItemProduct)
router.route('/deleteCartItem').delete(verifyJwt, deleteCartProductItem)
router.route("/deleteUser").delete(deleteUser)

router.route("/searchProduct").get(searchProduct)
router.route("/filter-product").post(filterProduct)

// checkout
router.route("/checkout").post( verifyJwt, orderPayment)
router.route("/webhook").post(webhooks)

router.route("/order-list").get(verifyJwt, orderController)

export default router;