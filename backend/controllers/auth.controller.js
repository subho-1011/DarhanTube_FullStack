import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import UserOtp, { USER_OTP_TYPE } from "../models/userOtp.model.js";

import {
    LoginFormSchema,
    RegisterFormSchema,
    ChangePasswordFormSchema,
} from "../../shared/validators/userValidations.js";
import {
    ApiErrorResponse,
    ApiReridectResponse,
    ApiSuccessResponse,
} from "../utils/handleApiResponse.js";

import {
    emailVerificationMail,
    forgotPasswordMail,
    passwordResetMail,
} from "../utils/sendEmail.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// register user
const registerUser = asyncHandler(async (req, res) => {
    const { data, error } = RegisterFormSchema.safeParse(req.body);
    if (error) {
        throw ApiErrorResponse.fromZodError(error);
    }

    const { name, username, email, password } = data;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        const errorMessage =
            existingUser.email === email ? "Email already exists" : "Username already exists";
        throw new ApiErrorResponse(400, errorMessage);
    }

    const newUser = await User.create({ name, username, email, password });

    const userEmailVerificationOtp = new UserOtp({
        email,
        otpType: USER_OTP_TYPE.EMAIL_VERIFICATION,
    });
    const otpCode = await userEmailVerificationOtp.generateOtpCode();
    await userEmailVerificationOtp.save();

    await emailVerificationMail(email, otpCode);

    return res.status(201).json(new ApiSuccessResponse(201, "User created successfully", newUser));
});

// login user
const loginUserByEmail = asyncHandler(async (req, res) => {
    const { email, password } = LoginFormSchema.parse(req.body);

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiErrorResponse(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordMatch(password);
    if (!isPasswordCorrect) {
        throw new ApiErrorResponse(401, "Invalid credentials");
    }

    if (!user.isVerified) {
        return res
            .status(301)
            .json(new ApiReridectResponse(301, "Email not verified", "/auth/verify-email"));
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    await User.findOneAndUpdate({ _id: user._id }, { $set: { refreshToken } }, { new: true });

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiSuccessResponse(200, { user: user.toJSON() }, "Login successful"));
});

// logout user
const logoutUser = async (req, res) => {
    if (!req.user) {
        throw new ApiErrorResponse(401, "User not found, unauthorized access");
    }

    // delete refresh token from database
    const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    if (!user) {
        throw new ApiErrorResponse(401, "User not found, unauthorized access");
    }

    // clear cookies
    const options = {
        httpOnly: true,
        secure: true,
    };

    res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiSuccessResponse(200, "Logout successful"));
};

// refresh token
const refreshToken = asyncHandler(async (req, res) => {
    const refreshTokenFromRequest = req.cookies.refreshToken ?? req.body.refreshToken;
    if (!refreshTokenFromRequest) {
        throw new ApiErrorResponse(401, "Refresh token not found, unauthorized access");
    }

    const decodedRefreshToken = jwt.verify(
        refreshTokenFromRequest,
        process.env.REFRESH_TOKEN_SECRET
    );
    if (!decodedRefreshToken) {
        throw new ApiErrorResponse(401, "Refresh token invalid, unauthorized access");
    }

    const user = await User.findById(decodedRefreshToken._id);
    if (!user) {
        throw new ApiErrorResponse(401, "User not found, unauthorized access");
    }

    if (user.refreshToken !== refreshTokenFromRequest) {
        throw new ApiErrorResponse(401, "Refresh token invalid, unauthorized access");
    }

    const newAccessToken = user.generateAccessToken();

    return res
        .status(200)
        .cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
        })
        .json(new ApiSuccessResponse(200, "Refresh token successful"));
});

// verify access token
const verifyAccessToken = asyncHandler(async (req, res) => {
    const accessToken = req.params.accessToken;

    if (!accessToken) {
        throw new ApiErrorResponse(401, "Access token not provided");
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
        throw new ApiErrorResponse(401, "Unauthorized: user not found");
    }

    return res.status(200).json(new ApiSuccessResponse(200, "Access token verified"));
});

// change password
const changePasswordByOldPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = ChangePasswordFormSchema.parse(req.body);

    const user = await User.findById(req.user?._id).select("+password");
    if (!user) {
        throw new ApiErrorResponse(404, "User not found while changing password");
    }

    const isPasswordMatch = await user.isPasswordMatch(oldPassword);
    if (!isPasswordMatch) {
        throw new ApiErrorResponse(400, "Old password is incorrect");
    }

    if (newPassword !== confirmPassword) {
        throw new ApiErrorResponse(400, "New password and confirm password do not match");
    }

    if (newPassword === oldPassword) {
        throw new ApiErrorResponse(400, "New password cannot be same as old password");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiSuccessResponse(200, "Password changed successfully"));
});

// email verification by otp
const verifyEmailByOtp = asyncHandler(async (req, res) => {
    const { email, otpCode } = otpSchema.parse(req.body);

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiErrorResponse(404, "User not found");
    }

    if (user.isVerified) {
        throw new ApiErrorResponse(400, "Email already verified");
    }

    const userOtp = await UserOtp.findOne({ email, otpType: USER_OTP_TYPE.EMAIL_VERIFICATION });
    if (!userOtp) {
        throw new ApiErrorResponse(400, "Invalid OTP code");
    }

    const isOtpCodeMatch = await userOtp.verifyOtpCode(otpCode);
    if (!isOtpCodeMatch) {
        throw new ApiErrorResponse(400, "Invalid OTP code");
    }

    user.isVerified = true;
    await user.save({ validateBeforeSave: false });

    await UserOtp.deleteOne({ _id: userOtp._id });

    return res.status(200).json(new ApiSuccessResponse(200, "Email verified successfully"));
});

// resend otp
const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const otpType = req.params.otpType;

    if (!email) {
        throw new ApiErrorResponse(400, "Email is required");
    }

    if (!otpType || !Object.values(USER_OTP_TYPE).includes(otpType)) {
        throw new ApiErrorResponse(400, "Invalid OTP type provided when resending OTP");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiErrorResponse(404, "User not found while resending email");
    }

    await UserOtp.findOneAndDelete({ email, otpType });

    const newOtp = new UserOtp({ email, otpType });
    const otpCode = await newOtp.generateOtpCode();
    await newOtp.save();

    switch (otpType) {
        case USER_OTP_TYPE.EMAIL_VERIFICATION:
            await emailVerificationMail(email, otpCode);
            break;

        case USER_OTP_TYPE.PASSWORD_RESET:
            await passwordResetMail(email, otpCode);
            break;

        case USER_OTP_TYPE.FORGOT_PASSWORD:
            await forgotPasswordMail(email, otpCode);
            break;

        default:
            throw new ApiErrorResponse(400, "Invalid OTP type provided when resending OTP");
    }

    return res.status(201).json(new ApiSuccessResponse(201, "OTP resended successfully"));
});

// TODO: forgot password
// TODO: send otp by email for forgot password
// TODO: verify forgot password otp

export {
    registerUser,
    loginUserByEmail,
    logoutUser,
    refreshToken,
    verifyAccessToken,
    changePasswordByOldPassword,
    verifyEmailByOtp,
    resendOtp,
};
