"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "../userAvatar";
import ThemeSubMenu from "@/components/theme/themeSubMenu";
import { User, Settings, LogOut, BellIcon, LogInIcon, Tv2Icon } from "lucide-react";
import { useAuth } from "@/hooks/auth";

const UserButton: React.FC = ({}) => {
    const router = useRouter();
    const pathaname = usePathname();

    const { user, isAuthenticated, logout } = useAuth();

    const handleLogIn = () => {
        let callbackUrl = pathaname;

        if (callbackUrl) {
            callbackUrl = callbackUrl.replace("/auth/login", "");
            router.push(`/auth/login?callbackUrl=${callbackUrl}`);
        } else {
            router.push("/auth/login");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-full border border-spacing-0.5 opacity-90 hover:opacity-100">
                    <UserAvatar user={user} />
                    <span className="sr-only">User menu</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                    <>
                        <DropdownMenuItem onClick={() => router.push("/profile")}>
                            <User className="mr-2 h-4 w-4" />
                            <span>My profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/channel/${user?.username}`)}>
                            <Tv2Icon className="mr-2 h-4 w-4" />
                            <span>My channel</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/profile/settings")}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push("/notifications")}>
                            <BellIcon className="mr-2 h-4 w-4" />
                            <span>Notifications</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                ) : null}
                <ThemeSubMenu />
                <DropdownMenuSeparator />
                {isAuthenticated ? (
                    <DropdownMenuItem
                        className="space-x-2"
                        onClick={() => {
                            logout();
                        }}
                    >
                        <LogOut className="h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem className="space-x-2" onClick={handleLogIn}>
                        <LogInIcon className="h-4 w-4" />
                        <span>Log in</span>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { UserButton };
