"use client";

import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { TLoginFormSchema } from "@/validators";
import { login, getMe, logout, refreshToken } from "@/redux/thunkApi/userThunkApi";
import { useMemo } from "react";

export const useAuth = () => {
    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector((state) => state.session.status === "authenticated");
    const user = useAppSelector((state) => state.session.user);

    const status = useAppSelector((state) => state.session.status);
    const currentUser = useMemo(() => user, [user]);

    const loginUser = (credentials: TLoginFormSchema) => dispatch(login(credentials));
    const getCurrentUser = () => dispatch(getMe());
    const logoutUser = () => dispatch(logout());
    const refreshTokenUser = () => dispatch(refreshToken());

    return {
        status,
        isAuthenticated,
        user: currentUser,
        login: loginUser,
        logout: logoutUser,
        getMe: getCurrentUser,
        refreshToken: refreshTokenUser,
    };
};
