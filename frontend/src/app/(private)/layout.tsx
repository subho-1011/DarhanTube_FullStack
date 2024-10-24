import AuthenticatedLayout from "@/components/layout/authenticatedLayout";
import React from "react";

const PrivateLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
};

export default PrivateLayout;
