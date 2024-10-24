"use client";

import * as React from "react";

import { AppSidebar } from "@/components/common/aside/appSidebar";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import Header from "@/components/common/header";
import { Toaster } from "@/components/ui/toaster";

import { useQuery } from "@tanstack/react-query";
import { refreshTokenUser } from "@/services/auth.services";
import { changeUserStatus, updateUserData } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/lib/utils";

export default function App({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    const { data, error } = useQuery({
        queryKey: ["refreshToken"],
        queryFn: () => refreshTokenUser(),
        refetchInterval: 10 * 60 * 1000,
        retry(failureCount, error) {
            if (failureCount > 3) {
                return false;
            }
            if (error?.message === "Network Error") {
                return false;
            }
            return true;
        },
        refetchOnWindowFocus: false,
    });

    const userData = React.useCallback(async () => {
        if (data && data.data) {
            dispatch(updateUserData(data.data.user));
            dispatch(changeUserStatus("authenticated"));
        }
    }, [data]);

    React.useEffect(() => {
        userData();
    }, [userData]);

    React.useEffect(() => {
        if (error) {
            dispatch(updateUserData(null));
            dispatch(changeUserStatus("unauthenticated"));
        }
    }, [error]);

    return (
        <div className="h-auto w-full flex flex-col">
            <Header />
            <div className="w-full flex-1 h-[calc(100%-64px)] relative">
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarTrigger />
                    <main className="flex flex-1 p-4 w-full items-center justify-center">
                        {children}
                        <Toaster />
                    </main>
                </SidebarProvider>
            </div>
        </div>
    );
}
