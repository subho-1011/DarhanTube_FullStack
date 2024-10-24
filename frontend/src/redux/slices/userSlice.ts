import { TBasicUser } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, getMe, logout, refreshToken } from "@/redux/thunkApi/userThunkApi";

type Actions = "login" | "logout" | "refreshToken" | "getMe";

interface IUserState {
    user: TBasicUser | null;
    status: "authenticated" | "loading" | "unauthenticated";
    loading: { [key in Actions]: boolean };
    error: { [key in Actions]: string | null };
}

const initialState: IUserState = {
    user: null,
    status: "unauthenticated",
    loading: {
        login: false,
        logout: false,
        refreshToken: false,
        getMe: false,
    },
    error: {
        login: null,
        logout: null,
        refreshToken: null,
        getMe: null,
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: () => initialState,
        updateUserData: (state, action: PayloadAction<TBasicUser | null>) => {
            state.user = action.payload;
        },

        changeUserStatus: (state, action: PayloadAction<"authenticated" | "unauthenticated">) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = "loading";
                state.loading.login = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
                state.status = "authenticated";
                state.loading.login = false;
                state.error.login = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "unauthenticated";
                state.loading.login = false;
                state.error.login = action.error.message || "Login failed";
            });

        builder
            .addCase(getMe.pending, (state) => {
                state.status = "loading";
                state.loading.getMe = true;
                state.error.getMe = null;
                state.user = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
                state.status = "authenticated";
                state.loading.getMe = false;
                state.error.getMe = null;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.status = "unauthenticated";
                state.loading.getMe = false;
                state.error.getMe = action.error.message || "Failed to get user";
            });
        builder
            .addCase(refreshToken.pending, (state, action) => {
                state.status = "loading";
                state.loading.refreshToken = true;
                state.error.refreshToken = null;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.user = action.payload.data.user;
                state.status = "authenticated";
                state.loading.refreshToken = false;
                state.error.refreshToken = null;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.user = null;
                state.status = "unauthenticated";
                state.loading.refreshToken = false;
                state.error.refreshToken = action.error.message || "Failed to refresh token";
            });
        builder
            .addCase(logout.pending, (state) => {
                state.status = "loading";
                state.loading.logout = true;
                state.error.logout = null;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.status = "unauthenticated";
                state.loading.logout = false;
                state.error.logout = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "unauthenticated";
                state.loading.logout = false;
                state.error.logout = action.error.message || "Failed to logout";
            });
    },
});

export const { resetUser, updateUserData, changeUserStatus } = userSlice.actions;

export default userSlice;
