"use client";

import * as React from "react";
import { useProfileCard } from "@/hooks/users";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileAvatar } from "@/services/user.services";
import { toast } from "../use-toast";

const useUpdateProfileAvatar = () => {
    const queryClient = useQueryClient();
    const { profileData } = useProfileCard();

    const [isEditing, setIsEditing] = React.useState(false);
    const [avatarUrl, setAvatarUrl] = React.useState(profileData?.profileAvatarUrl);
    const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    const containRef = React.useRef<HTMLDivElement>(null);
    const avatarInputRef = React.useRef<HTMLInputElement>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const { mutate, isPending } = useMutation({
        mutationFn: (formData: FormData) => updateProfileAvatar(formData),
        mutationKey: ["profile", "avatar"],
        onSuccess: () => {
            toast({
                title: "Avatar updated",
                description: "Your avatar has been updated successfully",
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
                description: "An error occurred while updating your avatar",
            });
        },
    });

    const onSaveAvatar = () => {
        if (avatarFile) {
            const formData = new FormData();
            formData.set("avatar", avatarFile);

            mutate(formData);
        }
        setIsEditing(false);
    };

    const onCancelAvatar = () => {
        setAvatarUrl(profileData?.profileAvatarUrl);
        setAvatarFile(null);
        setIsEditing(false);
    };

    const onTakeImage = () => {
        avatarInputRef.current?.click();
        setIsEditing(true);
    };

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containRef.current && !containRef.current.contains(e.target as Node)) {
                if (avatarUrl && avatarUrl !== profileData?.profileAvatarUrl) {
                    setOpenDialog(true);
                } else {
                    setOpenDialog(false);
                    onCancelAvatar();
                }
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
        avatarUrl,
        avatarFile,
        isEditing,
        avatarInputRef,
        containRef,
        handleAvatarChange,
        onSaveAvatar,
        onCancelAvatar,
        onTakeImage,
        openDialog,
        setOpenDialog,
        isLoading: isPending,
    };
};

export { useUpdateProfileAvatar };
