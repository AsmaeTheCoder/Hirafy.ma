import {createApi} from "@reduxjs/toolkit/query/react";
import { Utilisateur } from "../models/utilisateur.model";
import { baseQueryWithReauth } from "./api";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (builder) => ({
        // Admin
        // Liste Admin et Supporteur
        listeAdminSupporteur: builder.mutation({
            query: ({page, perPage}) => {
                const perPageSize = Number(perPage);
                return {
                    url:`/accounts/list?per-page=${perPageSize}&page=${page}`,
                    method: "get"
                }
            },
            invalidatesTags : ['User'],
        }),
        // Liste Clients
        listeClients: builder.mutation({
            query: ({page, perPage}) => {
                const perPageSize = Number(perPage);
                return {
                    url:`/accounts/listeClient?per-page=${perPageSize}&page=${page}`,
                    method: "get"
                }
            },
            invalidatesTags : ['User'],
        }),
        // Liste Artisan
        listeArtisans: builder.mutation({
            query: ({page, perPage}) => {
                const perPageSize = Number(perPage);
                return {
                    url:`/accounts/listeArtisan?per-page=${perPageSize}&page=${page}`,
                    method: "get"
                }
            },
            invalidatesTags : ['User'],
        }),
        // Détails de tous les utilisateurs
        detailsUser: builder.query<Utilisateur, string>({
            query: (id) => `/accounts/detailsAccount/${id}`,
            providesTags : ['User'],
        }),
        // Ajout Supporteur et Admin
        addSupporteurAdmin: builder.mutation<{}, Utilisateur>({
            query: (user) => ({
                url: "/accounts/ajouterAccount",
                method: "POST",
                body: user,
            }),
            invalidatesTags : ['User'],
        }),
        // Modifier Supporteur ou Admin
        updateSupporteurAdmin: builder.mutation<void, Utilisateur>({
            query: ({ id, ...rest }) => ({
                url: `/accounts/modifiereUser/${id}`, 
                method: "PUT",
                body: rest,
            }),
            invalidatesTags : ['User'],
        }),  
        // Modifier Artisan ou Client
        updateArtisanClient: builder.mutation<void, Utilisateur>({
            query: ({ id, ...rest }) => ({
                url: `/accounts/EditUser/${id}`, 
                method: "PUT",
                body: rest,
            }),
            invalidatesTags : ['User'],
        }),  
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `/accounts/supprimerAccount/${id}`,
                method: "DELETE",
            }),
            invalidatesTags : ['User'],
        })
    })
});

export const {
    useListeAdminSupporteurMutation,
    useListeClientsMutation,
    useListeArtisansMutation,
    useDetailsUserQuery,
    useAddSupporteurAdminMutation,
    useUpdateSupporteurAdminMutation,
    useUpdateArtisanClientMutation,
    useDeleteUserMutation,
} = userApi;