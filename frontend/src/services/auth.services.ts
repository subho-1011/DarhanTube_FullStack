import { TEmailVerificationFormSchema, TLoginFormSchema, TRegisterFormSchema } from "@/validators";
import { axiosAuthInstance, axiosErrorHandler } from "@/utils/axios";
import axios from "axios";

export const registerUser = async (data: TRegisterFormSchema) => {
    try {
        const response = await axiosAuthInstance.post("/auth/register", data);
        console.log(response.data);

        return response.data;
    } catch (error) {
        axiosErrorHandler(error);
    }
};

export const loginUser = async (data: TLoginFormSchema) => {
    try {
        const response = await axiosAuthInstance.post("/auth/login", data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error?.response?.data.message);

            if (error.response?.status === 429) {
                throw "Too many requests";
            }

            if (error.response?.status === 301 || error.response?.status === 302) {
                window.location.href = "/auth/verify-email";
                return;
            }

            if (error.response?.data) {
                const errorMessage =
                    error.response?.data?.message ||
                    error.response.data.error ||
                    error.message ||
                    "Something went wrong";

                throw errorMessage;
            }
        }

        if (error instanceof Error) {
            console.log(error.message);

            throw error.message;
        }

        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await axiosAuthInstance.post("/auth/logout");

        return response.data;
    } catch (error) {
        axiosErrorHandler(error);
    }
};

// refresh token
export const refreshTokenUser = async () => {
    try {
        const response = await axiosAuthInstance.post("/auth/refresh-token");

        return response.data;
    } catch (error) {
        axiosErrorHandler(error);
    }
};

// verify access token
export const verifyAccessToken = async (accessToken: string) => {
    try {
        const response = await axiosAuthInstance.get(`/auth/verify-access-token/${accessToken}`);

        return response.data;
    } catch (error) {
        axiosErrorHandler(error);
    }
};

// verify email
export const verifyEmailByOtp = async (data: TEmailVerificationFormSchema) => {
    try {
        const response = await axiosAuthInstance.post("/auth/otp/email-verification/verify", data);

        return response.data;
    } catch (error) {
        axiosErrorHandler(error);
    }
};

export const sendEmailVerificationOtp = async (email: string) => {
    try {
        const response = await axiosAuthInstance.post(`/auth/otp/email-verification/send`, {
            email,
        });

        return response.data;
    } catch (error) {
        axiosErrorHandler(error);
    }
};
