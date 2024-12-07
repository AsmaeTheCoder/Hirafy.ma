import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../app/store";
import { Reclamation } from "../models/reclamation.model";

interface GetReclamationsResponse {
    data: Reclamation[];
    nextPage: number | null;
  }

export const reclamationApi = createApi({
    reducerPath: "reclamationApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://127.0.0.1:7003",
        prepareHeaders: (headers, { getState }) => {
            headers.set('Accept', 'application/json')
            return headers;
        },
        credentials: "include"
    }),
    tagTypes: ['Reclamation'],
    endpoints: (builder) => ({
        listeReclamations: builder.mutation({
            query: ({page, perPage}) => {
                const perPageSize = Number(perPage);
                return{
                    url: `/reclamations/listReclamations?per-page=${perPageSize}&page=${page}`,
                    method: "get"
                }
            },
            invalidatesTags: ['Reclamation'],
        }),
        detailsReclamation: builder.query<Reclamation, string>({
            query: (id) => `/reclamations/showReclamation/${id}`,
            providesTags : ['Reclamation'],
        }),
        addReclamation: builder.mutation<{}, Reclamation>({
            query: (reclamation) => ({
                url: "/reclamations/addReclamation",
                method: "POST",
                body: reclamation,
            }),
            invalidatesTags : ['Reclamation'],
        }),
        updateReclamation: builder.mutation<void, Reclamation>({
            query: ({ id, ...rest }) => ({
                url: `/reclamations/editReclamation/${id}`, 
                method: "PUT",
                body: rest,
            }),
            invalidatesTags : ['Reclamation'],
        }),
        deleteReclamation: builder.mutation<void, number>({
            query: (id) => ({
                url: `/reclamations/deleteReclamation/${id}`,
                method: "DELETE",
            }),
            invalidatesTags : ['Reclamation'],
        })
    })
});

export const {
    useListeReclamationsMutation,
    useDetailsReclamationQuery,
    useAddReclamationMutation,
    useUpdateReclamationMutation,
    useDeleteReclamationMutation,
} = reclamationApi;