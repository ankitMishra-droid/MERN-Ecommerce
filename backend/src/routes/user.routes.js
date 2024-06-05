import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { changePassword, getCuurentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateDetails } from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router()

router.route('/register').post(upload.fields([{name: "profilePic", maxCount: 1}]), registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route('/refreshToken').post(refreshAccessToken)
router.route('/change-password').post(verifyJwt, changePassword)
router.route("/update-profile").patch(verifyJwt, updateDetails)
router.route("/get-current-user").get(verifyJwt, getCuurentUser)

export default router;