"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfileCard } from "./use-profile-card";
import { updateProfileCoverImage } from "@/services/user.services";
import { toast } from "../use-toast";

const useUpdateProfileCoverImage = () => {
    const { profileData } = useProfileCard();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = React.useState(false);
    const [coverImageUrl, setCoverImageUrl] = React.useState(profileData?.coverImageUrl);
    const [coverImageFile, setCoverImageFile] = React.useState<File | null>(null);

    const coverImageInputRef = React.useRef<HTMLInputElement>(null);
    const containRef = React.useRef<HTMLDivElement>(null);

    const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCoverImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (formData: FormData) => updateProfileCoverImage(formData),
        mutationKey: ["profile", "coverImage"],
        onSuccess: () => {
            toast({
                title: "Cover image updated",
                description: "Your cover image has been updated successfully",
            });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            queryClient.setQueryData(["profile"], (oldData) => {
                if (oldData) {
                    return {
                        ...oldData,
                    };
                }
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "An error occurred while updating your cover image",
            });
        },
    });

    const onSaveCoverImage = () => {
        if (coverImageFile) {
            const formData = new FormData();
            formData.set("coverImage", coverImageFile);

            mutate(formData);
        }
        setIsEditing(false);
    };

    const onCancelCoverImage = () => {
        setCoverImageUrl(profileData?.coverImageUrl);
        setCoverImageFile(null);
        setIsEditing(false);
    };

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containRef.current && !containRef.current.contains(e.target as Node)) {
                onCancelCoverImage();
            }
        };

        if (isEditing) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditing]);

    return {
        coverImageUrl,
        coverImageFile,
        handleCoverImageChange,
        onSaveCoverImage,
        onCancelCoverImage,
        isEditing,
        setIsEditing,
        isLoading: isPending,
        containRef,
        coverImageInputRef,
    };
};

export { useUpdateProfileCoverImage };
