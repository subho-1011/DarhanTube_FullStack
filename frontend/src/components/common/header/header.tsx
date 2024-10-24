"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { UserButton } from "./userButton";
import { ContentUploadButton } from "./contentUploadButton";
import { DarshanLogo } from "../logo";

const Header: React.FC = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <header className="top-0 border-b-2 h-16 sticky bg-background/50 backdrop-blur flex items-center justify-between px-4 z-40 border-border/40">
            <div className="flex items-center">
                <Link href="/" className="flex items-center justify-center">
                    <DarshanLogo />
                    {!isSearchFocused && (
                        <span className="text-base md:text-2xl tracking-wider font-bold ml-1">
                            DarshanTube
                        </span>
                    )}
                </Link>
            </div>
            <div className="flex-1 max-w-md mx-4">
                <form
                    onSubmit={onSubmit}
                    className="flex items-center border rounded-2xl focus-within:bg-background/90"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                >
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="flex-grow rounded-2xl rounded-r-none py-2"
                    />
                    <Button
                        type="submit"
                        variant="ghost"
                        size="icon"
                        className="rounded-2xl rounded-l-none"
                    >
                        <Search className="h-6 w-6" />
                        <span className="sr-only">Search</span>
                    </Button>
                </form>
            </div>
            <div className="flex items-center space-x-2 md:space-x-5">
                {!isSearchFocused && <ContentUploadButton className="flex md:hidden" />}
                <ContentUploadButton className="hidden md:flex" />
                <button className="opacity-75 hover:opacity-100 hidden md:flex">
                    <Bell className="h-6 w-6" />
                    <span className="sr-only">Notifications</span>
                </button>
                <UserButton />
            </div>
        </header>
    );
};

export default Header;
