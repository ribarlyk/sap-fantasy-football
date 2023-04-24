import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profilePic:
        "https://industrial.uii.ac.id/wp-content/uploads/2019/09/385-3856300_no-avatar-png-e1600750858753.jpg",
};

export const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        changeProfilePic: (state, action) => {
            state.profilePic = action.payload;
        },
        changeUserName: (state, action) => {
            state.username = action.payload;
        },
    },
});

export const { changeProfilePic, changeUserName } = profileSlice.actions;

export default profileSlice.reducer;
