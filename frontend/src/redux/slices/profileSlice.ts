import { IProfileData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProfileState {
    profileData: IProfileData | null;
    isEditable: boolean;
}

const initialState: IProfileState = {
    profileData: null,
    isEditable: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        toggleEditable: (state) => {
            state.isEditable = !state.isEditable;
        },

        setProfile: (state, action: PayloadAction<IProfileData>) => {
            state.profileData = action.payload;
        },

        updateProfileData: (state, action: PayloadAction<IProfileData>) => {
            state.profileData = {
                ...state.profileData,
                ...action.payload,
            };
        },

        clearProfile: (state) => {
            state.profileData = null;
        },
    },
});

export const { toggleEditable, setProfile, updateProfileData, clearProfile } = profileSlice.actions;

export default profileSlice;
