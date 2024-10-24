"use client";

import * as React from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useAppDispatch, useAppSelector } from "@/lib/utils";
import { setProfile, toggleEditable } from "@/redux/slices/profileSlice";

import { useToast } from "@/hooks/use-toast";

import { Gender } from "@/types";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileData } from "@/redux/slices/profileSlice";
import { TEditProfileFormSchema } from "@/validators";
import { EditProfileFormSchema } from "@/validators/profileValidations";
import { getCurrentUserProfile, updateProfile } from "@/services/user.services";

export const useProfileCard = () => {
    const dispatch = useAppDispatch();
    const { isEditable, profileData } = useAppSelector((state) => state.profile);

    const toggleEditButton = () => dispatch(toggleEditable());

    const { data, error, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: () => getCurrentUserProfile(),
        refetchOnWindowFocus: false,
    });

    const queryClient = useQueryClient();

    const { toast } = useToast();

    const { mutate, isPending: isUpdating } = useMutation({
        mutationFn: (data: TEditProfileFormSchema) => updateProfile(data),
        mutationKey: ["profile"],
        onSuccess: (res) => {
            if (res && res.data) {
                dispatch(updateProfileData(res?.data.profile));
            }
            toast({
                title: "Profile updated",
                description: "Your profile has been updated successfully",
            });
            toggleEditButton();
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
        onError: (error: unknown) => {
            toast({
                title: "Error",
                description: error as string,
                variant: "destructive",
            });
        },
    });

    const onSubmit = (data: TEditProfileFormSchema) => {
        console.log(data);

        mutate(data);
    };

    const form = useForm<TEditProfileFormSchema>({
        resolver: zodResolver(EditProfileFormSchema),
        defaultValues: {
            firstName: profileData?.firstName,
            lastName: profileData?.lastName,
            bio: profileData?.bio,
            city: profileData?.city,
            gender: profileData?.gender as Gender,
            birthday: profileData?.birthday ? format(profileData?.birthday, "dd/MM/yyyy") : "",
            websites: profileData?.websites,
            socials: profileData?.socials,
        },
    });

    const websiteInputRef = React.useRef<HTMLInputElement>(null);

    const addWebsite = () => {
        if (!websiteInputRef.current?.value) {
            form.setError("websites", {
                type: "custom",
                message: "Website is required",
            });
            return;
        }

        if (form.getValues("websites")?.includes(websiteInputRef.current?.value)) {
            form.setError("websites", {
                type: "custom",
                message: "Website already exists",
            });
            websiteInputRef.current.value = "";
            return;
        }

        form.setValue("websites", [
            ...(form.getValues("websites") || []),
            websiteInputRef.current?.value,
        ]);

        websiteInputRef.current.value = "";
        form.clearErrors("websites");
    };

    const removeWebsite = (website: string) => {
        form.setValue(
            "websites",
            form.getValues("websites")?.filter((w) => w !== website)
        );
    };

    React.useEffect(() => {
        if (data && data.data) {
            dispatch(setProfile(data.data.profile));
        }
    }, [data]);

    return {
        isEditable,
        toggleEditButton,
        profileData,
        error,
        isLoading,
        form,
        onSubmit,
        isUpdating,
        websiteInputRef,
        addWebsite,
        removeWebsite,
    };
};
