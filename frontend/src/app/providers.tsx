"use client";

import React from "react";
import { makeStore } from "@/redux/store";
import { refreshToken } from "@/redux/thunkApi/userThunkApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider as ReduxProvider } from "react-redux";

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
    const store = React.useMemo(() => makeStore(), []);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const dispatchRefreshToken = async () => {
            try {
                await store.dispatch(refreshToken()).unwrap(); // Handle success or error
            } catch (error) {
                console.error("Failed to refresh token:", error);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }
        };

        dispatchRefreshToken();
    }, [store]);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center space-x-5">
                <div className="flex rounded-full w-10 h-10 bg-muted-foreground animate-bounce" />
                <div className="flex rounded-full w-10 h-10 bg-muted-foreground animate-bounce delay-200" />
                <div className="flex rounded-full w-10 h-10 bg-muted-foreground animate-bounce delay-500" />
            </div>
        );
    }

    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ReduxProvider>
    );
};

export default Providers;
