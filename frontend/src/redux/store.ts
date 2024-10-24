import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "@/redux/slices/userSlice";
import ProfileSlice from "@/redux/slices/profileSlice";

export const makeStore = () =>
    configureStore({
        reducer: {
            session: UserSlice.reducer,
            profile: ProfileSlice.reducer,
        },
    });

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
