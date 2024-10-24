export type TBasicUser = {
    _id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    role: string;
    createdAt: Date;
};

export type Gender = "male" | "female" | "others" | undefined;

export interface IProfileResponse {
    status: number;
    message: string;
    data: ProfileData;
    success: boolean;
}

export interface ProfileData {
    profile: IProfileData;
}

interface IWebsite {
    name: string;
    url: string;
}

export interface IProfileData {
    _id: string;
    username: string;
    firstName: string;
    lastName?: string;
    bio?: string;
    city?: string;
    gender?: Gender;
    birthday?: string;
    websites: string[];
    socials: { [key: string]: string };
    createdAt: Date;
    profileAvatarUrl: string;
    coverImageUrl: string;
    owner: string;
}
