import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";
import { Utilisateur } from "../models/utilisateur.model";
import { setUser } from "../features/authSlice1";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Account'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url : "/auth/login",
                    method: "post",
                    body,
                };
            },
            onQueryStarted: async (arg, api) => {
                try {
                    const { data } = await api.queryFulfilled
                } catch (error) {
                }
            }
        }),
        registerUser: builder.mutation({
            query: (body: { 
                fname: string; 
                lname: string;
                telephone: string;
                adresse: string;
                ville: string;
                // profil: string;
                email: string; 
                password: string;
                role: string; 
            }) => {
                return {
                    url : "/auth/register",
                    method: "post",
                    body,
                };
            },
        }),
        registerUserArtisan: builder.mutation({
            query: (body: { 
                fname: string; 
                lname: string;
                telephone: string;
                adresse: string;
                ville: string;
                // profil: string;
                email: string; 
                password: string;
                category_id: string;
                role: string; 
            }) => {
                return {
                    url : "/auth/register",
                    method: "post",
                    body,
                };
            },
        }),
        verifyUSer: builder.mutation<Utilisateur, string | void>({
            query: (token) => ({
                url: "/auth/verify",
                method: "POST",
                body: {token}
            })
        }),
        resetPassword: builder.mutation({
            query: (body: { 
                old_password: string; 
                new_password: string;
                confirm_password: string;
            }) => {
                return {
                    url : "/auth/resetPassword",
                    method: "post",
                    body,
                };
            },
            invalidatesTags : ['Account'],
        }),
        getProfil: builder.query<Utilisateur, void>({
            query: () => "/auth/profile",
            providesTags : ['Account'],
        }),
        updateProfil: builder.mutation({
            query: (body: { 
                fname: string; 
                lname: string; 
                telephone: string;
                adresse: string;
                ville: string;
                profil: string | null;
                email: string;
            }) => {
                return{
                    url: `/auth/profile`,
                    method: "PUT",
                    body,
                };               
            },
            invalidatesTags : ['Account'],
        }),
        currentUser: builder.query<Utilisateur, void>({
            query: () => "/auth/current",
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setUser(data));
                } catch (error) {}
            },
        }),
        generateToken: builder.mutation({
            query: (body) => {
                return{
                    url: "/auth/password/request",
                    method: "POST",
                    body
                };
            },
            invalidatesTags : ['Account'],
        }),
        verifyToken: builder.mutation({
            query: (body) => {
                return{
                    url: "/auth/password/verify",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags : ['Account'],
        }),
        changerPassword: builder.mutation({
            query: (body: { 
                password: string; 
                confirm_password: string;
                token: any;
            }) => {
                return{
                    url: "/auth/password/change",
                    method: "POST",
                    body,
                };
            },
            invalidatesTags : ['Account'],
        }),
        logOut: builder.mutation<string, void>({
            query: () => {
                return {
                    url: "/auth/logout",
                    method: "POST",
                }
            }
        }),
    })
});

export const { 
    // Authentification
    useLoginUserMutation,
    useRegisterUserMutation,
    useRegisterUserArtisanMutation,
    useVerifyUSerMutation,
    useResetPasswordMutation,
    useGetProfilQuery,
    useUpdateProfilMutation,
    useCurrentUserQuery,
    useGenerateTokenMutation,
    useVerifyTokenMutation,
    useChangerPasswordMutation,
    useLogOutMutation,
} = authApi;
