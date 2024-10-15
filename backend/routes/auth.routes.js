import { Router } from "express";
import rateLimit from "express-rate-limit";

import {
    registerUser,
    loginUserByEmail,
    logoutUser,
    refreshToken,
    verifyAccessToken,
    changePasswordByOldPassword,
    verifyEmailByOtp,
    resendOtp,
} from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleeare.js";

const router = Router();

const loginAttemptLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Too many login attempts, please try again later.",
});

const otpRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Too many otp attempts, please try again later.",
});

router.route("/register").post(loginAttemptLimiter, registerUser);
router.route("/login").post(loginAttemptLimiter, loginUserByEmail);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/verify-access-token/:accessToken").get(verifyAccessToken);
router.route("/refresh-token").post(refreshToken);

router.route("/password/change").post(verifyJwt, changePasswordByOldPassword);

router.route("/otp/email-verification/verify").post(verifyEmailByOtp);
router.route("/otp/resend/:otpType").post(otpRateLimiter, resendOtp);

export default router;
