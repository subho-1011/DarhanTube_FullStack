"use client";

import React from "react";

import {
    ProfileCardAvatar,
    ProfileCardCoverImage,
    ProfileContents,
    EditProfileContentsForm,
} from "@/components/profile";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { useAppSelector } from "@/lib/utils";
import { useProfileCard } from "@/hooks/users";
import { LoaderPinwheel } from "lucide-react";

export const ProfileCard = () => {
    const { isEditable, isLoading } = useProfileCard();

    const profileData = useAppSelector((state) => state.profile.profileData);

    if (!isLoading || !profileData) {
        return (
            <div className="w-full flex items-center justify-center">
                <LoaderPinwheel className="w-10 h-10 animate-spin" />
            </div>
        );
    }

    return (
        <Card className="max-w-3xl w-full mx-auto">
            <ProfileCardCoverImage profile={profileData} />
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <ProfileCardAvatar profile={profileData} />
                    <div>
                        <CardTitle className="flex flex-col text-2xl font-bold">
                            {profileData?.firstName} {profileData?.lastName}
                            <span className="text-base text-muted-foreground">
                                @{profileData?.username}
                            </span>
                        </CardTitle>
                        <p className="text-gray-500 text-sm">{profileData?.city}</p>
                    </div>
                </div>
            </CardHeader>
            {!isEditable ? (
                <ProfileContents profileData={profileData} />
            ) : (
                <EditProfileContentsForm profileData={profileData} />
            )}
        </Card>
    );
};
