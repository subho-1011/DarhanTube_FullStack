"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const DarshanLogo = ({ className }: { className?: string }) => {
    const router = useRouter();

    return (
        <Image
            src="/darshan-logo.png"
            alt="darshan-logo"
            width={100}
            height={60}
            className={cn("h-6 w-auto", className)}
        />
    );
};
