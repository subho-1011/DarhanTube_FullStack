"use client";

import React from "react";
import { IProfileData } from "@/types";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Check, Loader2Icon, X } from "lucide-react";

import { useUpdateProfileAvatar } from "@/hooks/users";

export const ProfileCardAvatar: React.FC<{ profile: IProfileData }> = ({ profile }) => {
    const {
        containRef,
        avatarInputRef,
        avatarUrl,
        handleAvatarChange,
        onSaveAvatar,
        onCancelAvatar,
        onTakeImage,
        openDialog,
        setOpenDialog,
        isEditing,
        isLoading,
    } = useUpdateProfileAvatar();

    return (
        <>
            <div className="relative" ref={containRef}>
                <Avatar
                    className={`h-20 w-20 ${isLoading ? "animate-pulse cursor-wait" : "cursor-pointer"}`}
                    ref={avatarInputRef}
                    onClick={onTakeImage}
                >
                    <AvatarImage
                        src={avatarUrl || profile?.profileAvatarUrl}
                        alt={`${profile?.firstName} ${profile?.lastName}`}
                    />
                    <AvatarFallback>
                        {profile?.firstName[0].toUpperCase()}
                        {profile?.lastName?.[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Loader2Icon className="animate-spin h-6 w-6 text-muted-foreground" />
                    </div>
                )}

                {isEditing ? (
                    <>
                        <Button
                            variant="secondary"
                            className="absolute bottom-0 -left-2 w-8 h-8 rounded-full p-1"
                            onClick={onCancelAvatar}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="secondary"
                            className="absolute bottom-0 -right-2 w-8 h-8 rounded-full p-1"
                            onClick={onSaveAvatar}
                        >
                            <Check className="h-4 w-4" />
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="secondary"
                        className="absolute bottom-0 -right-2 w-8 h-8 rounded-full p-1"
                        onClick={onTakeImage}
                    >
                        <Camera className="h-4 w-4" />
                    </Button>
                )}
                <input
                    type="file"
                    ref={avatarInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                />
            </div>

            {openDialog && (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogTitle>Change Avatar</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to change your avatar?
                        </DialogDescription>
                        <DialogFooter>
                            <DialogClose asChild onClick={() => onCancelAvatar()}>
                                <Button variant="destructive">
                                    <X className="h-4 w-4 mr-2" /> Cancel
                                </Button>
                            </DialogClose>
                            <DialogClose asChild onClick={() => onSaveAvatar()}>
                                <Button>
                                    <Check className="h-4 w-4 mr-2" /> Confirm
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
};
