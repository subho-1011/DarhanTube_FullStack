"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import LoginTooltip from "@/components/common/loginTooltip";

import { Button } from "@/components/ui/button";
import { PenSquareIcon, PlaySquareIcon, UploadIcon } from "lucide-react";

const ContentUploadButton: React.FC<{ className?: string }> = ({ className }) => {
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className={cn("opacity-75 hover:opacity-100", className)}
                >
                    <LoginTooltip text="upload content">
                        <UploadIcon className="h-6 w-6" />
                    </LoginTooltip>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push(`/channel/@me/upload`)}>
                    <PlaySquareIcon className="h-4 w-4 mr-2" />
                    Upload video
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/community")}>
                    <PenSquareIcon className="h-4 w-4 mr-2" />
                    Create post
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export { ContentUploadButton };
