import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Utilisateur } from "../models/utilisateur.model";

export interface AuthSate {
    user: Utilisateur | null;
}

const initialState: AuthSate = {
    user: null
}

export const authSlice1 = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<Utilisateur | null>
        ) => {
            state.user = action.payload
        }
    },
});


export const selectAuth = (state: RootState) => state.auth;

export const { setUser } = authSlice1.actions;

export default authSlice1.reducer;