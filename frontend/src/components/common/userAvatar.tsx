"use client";

import { TBasicUser } from "@/types";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar: React.FC<{ user: TBasicUser | null }> = ({ user }) => {
    return (
        <Avatar className="ring-offset-1 ring-1 shadow-2xl ring-popover-foreground">
            {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt="User logo" />}
            <AvatarFallback>
                <User />
            </AvatarFallback>
            <span className="sr-only">User avatar</span>
        </Avatar>
    );
};

export { UserAvatar };
