import React from "react";
import { useAuth } from "@/hooks/auth";

const LoginTooltip: React.FC<{ text: string; children: React.ReactNode }> = ({
    text,
    children,
}) => {
    const [visible, setVisible] = React.useState(false);

    const { isAuthenticated } = useAuth();

    return (
        <div
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="relative inline-block"
        >
            {children}
            {visible && (
                <>
                    {isAuthenticated ? (
                        <div className="absolute m-4 flex flex-col z-30 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground">
                            {text}
                        </div>
                    ) : (
                        <div className="absolute m-4 flex flex-col z-30 rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground">
                            you are not logged in
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default LoginTooltip;
