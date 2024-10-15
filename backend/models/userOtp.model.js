import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const USER_OTP_TYPE = ["emailVerification", "passwordReset", "forgotPassword"];

const OTP_EXPIRY = 10 * 60 * 1000;

const userOtpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
        },
        otpCode: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            default: () => new Date(Date.now() + OTP_EXPIRY),
        },
        otpType: {
            type: String,
            enum: USER_OTP_TYPE,
            required: true,
        },
    },
    { timestamps: true }
);

userOtpSchema.methods.generateOtpCode = async function () {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP code using bcrypt
    const hashedOtpCode = await bcrypt.hash(otpCode, 10);

    // Set OTP and expiration time
    this.otpCode = hashedOtpCode;
    this.expiresAt = new Date(Date.now() + OTP_EXPIRY);

    return otpCode;
};

userOtpSchema.methods.verifyOtpCode = async function (otpCode) {
    const isOtpMatch = await bcrypt.compare(otpCode, this.otpCode);

    // Check if the OTP is valid
    if (!isOtpMatch) {
        throw new Error("Invalid OTP, please try again.");
    }

    // Check if the OTP has expired
    if (this.expiresAt < Date.now()) {
        throw new Error("OTP has expired.");
    }

    return true;
};

const UserOtp = mongoose.model("UserOtp", userOtpSchema);

export default UserOtp;
