import { IProfileResponse } from "@/types";
import { axiosAuthInstance, axiosErrorHandler } from "@/utils/axios";
import { TEditProfileFormSchema } from "@/validators";

// get current user
const getCurrentUser = async () => {
    try {
        const response = await axiosAuthInstance.get("/users/me");
        return response.data;
    } catch (error) {
        axiosErrorHandler(error);
    }
};

// get current user profile
const getCurrentUserProfile = async (): Promise<IProfileResponse | undefined> => {
    try {
        const response = await axiosAuthInstance.get("/users/profile");

        return response.data;
    } catch (error) {
        axiosErrorHandler(error);
    }
};

// update user profile
const updateProfile = async (
    data: TEditProfileFormSchema
): Promise<IProfileResponse | undefined> => {
    try {
        const response = await axiosAuthInstance.patch("/users/profile", data);

        return response.data;
    } catch (error) {
        axiosErrorHandler(error);
    }
};

// update user profile avatar
const updateProfileAvatar = async (formData: FormData): Promise<IProfileResponse | undefined> => {
    try {
        const response = await axiosAuthInstance.patch("/users/profile/update-avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        axiosErrorHandler(error);
    }
};

// update user profile cover image
const updateProfileCoverImage = async (
    formData: FormData
): Promise<IProfileResponse | undefined> => {
    try {
        const response = await axiosAuthInstance.patch(
            "/users/profile/update-cover-image",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;
    } catch (error) {
        axiosErrorHandler(error);
    }
};

export {
    getCurrentUser,
    getCurrentUserProfile,
    updateProfile,
    updateProfileAvatar,
    updateProfileCoverImage,
};
