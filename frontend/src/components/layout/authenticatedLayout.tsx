"use client";

import { useAuth } from "@/hooks/auth";
import { useAppSelector } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        router.push("/auth/login");
    }

    return <>{isAuthenticated && children}</>;
};

export default AuthenticatedLayout;
