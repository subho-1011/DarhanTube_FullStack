import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

const axiosAuthInstance = axios.create({
    baseURL: `${process.env.API_BASE_URL}`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const axiosUploadInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
});

const axiosErrorHandler = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.error(error?.response?.data.message);

        if (error.response?.status === 429) {
            throw "Too many requests";
        }

        if (error.response?.status === 301 || error.response?.status === 302) {
            window.location.href = "/auth/login";

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
};

export default axiosInstance;

export { axiosAuthInstance, axiosUploadInstance, axiosErrorHandler };
