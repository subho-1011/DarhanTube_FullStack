import { createAsyncThunk } from "@reduxjs/toolkit";
import { TLoginFormSchema } from "@/validators";
import { getCurrentUser } from "@/services/user.services";
import { loginUser, logoutUser, refreshTokenUser } from "@/services/auth.services";

// login
const login = createAsyncThunk("user/login", async (data: TLoginFormSchema) => {
    return await loginUser(data);
});

// getme
const getMe = createAsyncThunk("user/getCurrentUser", async () => {
    return await getCurrentUser();
});

// log out
const logout = createAsyncThunk("user/logout", async () => {
    return await logoutUser();
});

// refresh token
const refreshToken = createAsyncThunk("user/refreshToken", async () => {
    return await refreshTokenUser();
});

export { login, getMe, logout, refreshToken };
