"use client";

import React from "react";
import { IProfileData } from "@/types";
import { Button } from "@/components/ui/button";
import { Check, Edit, Loader2Icon, X } from "lucide-react";

import { useUpdateProfileCoverImage } from "@/hooks/users";

export const ProfileCardCoverImage: React.FC<{ profile: IProfileData }> = ({ profile }) => {
    const {
        coverImageUrl,
        handleCoverImageChange,
        onSaveCoverImage,
        onCancelCoverImage,
        isEditing,
        setIsEditing,
        isLoading,
        containRef,
        coverImageInputRef,
    } = useUpdateProfileCoverImage();

    return (
        <div className="relative border-b-2" ref={containRef}>
            {coverImageUrl || profile?.coverImageUrl ? (
                <img
                    src={coverImageUrl || profile?.coverImageUrl}
                    alt="Cover"
                    className="w-full h-48 object-cover"
                />
            ) : (
                <div className="w-full h-48 bg-accent rounded-md rounded-b-none"></div>
            )}

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Loader2Icon className="animate-spin h-6 w-6 text-muted-foreground" />
                </div>
            )}

            {isEditing ? (
                <>
                    <Button
                        variant="secondary"
                        className="absolute bottom-2 right-20 w-10 h-10 rounded-full p-1"
                        onClick={onCancelCoverImage}
                    >
                        <X className="h-6 w-6 text-destructive" />
                    </Button>
                    <Button
                        variant="secondary"
                        className="absolute bottom-2 right-4 w-10 h-10 rounded-full p-1"
                        onClick={onSaveCoverImage}
                    >
                        <Check className="h-6 w-6" />
                    </Button>
                </>
            ) : (
                <Button
                    variant="secondary"
                    className="absolute bottom-2 right-4 w-10 h-10 rounded-full p-1"
                    onClick={() => {
                        coverImageInputRef.current?.click();
                        setIsEditing(true);
                    }}
                >
                    <Edit className="h-6 w-6" />
                </Button>
            )}
            <input
                type="file"
                ref={coverImageInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleCoverImageChange}
            />
        </div>
    );
};
