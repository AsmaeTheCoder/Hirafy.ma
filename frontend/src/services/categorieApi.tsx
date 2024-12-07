import {createApi} from "@reduxjs/toolkit/query/react";
import { Categorie } from "../models/categorie.model";
import { baseQueryWithReauth } from "./api";

export const categorieApi = createApi({
    reducerPath: "categorieApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Categorie'],
    endpoints: (builder) => ({
        // Liste Categories vu par le tous
        listeAllCategories: builder.query<Categorie[], void>({
            query: () => `/categories/collection`,
            providesTags : ['Categorie'],
        }),
        // Admin
          // listeCategories: builder.query<Categorie[], void>({
        //     query: () => `/categories/list`,
        //     providesTags : ['Account'],
        // }),
        
        listeCategories: builder.mutation({
            query: ({page, perPage}) => {
                const perPageSize = Number(perPage);
                return {
                    url:`/categories/list?per-page=${perPageSize}&page=${page}`,
                    method: "get"
                }
            },
            invalidatesTags : ['Categorie'],
        }),
        detailsCategorie: builder.query<Categorie, string>({
            query: (id) => `/categories/show/${id}`,
            providesTags : ['Categorie'],
        }),
        addCategorie: builder.mutation<{}, Categorie>({
            query: (categorie) => ({
                url: "/categories/add",
                method: "POST",
                body: categorie,
                formData: true,
            }),
            invalidatesTags : ['Categorie'],
        }),
        updateCategorie: builder.mutation<void, Categorie>({
            query: ({ id, ...rest }) => ({
                url: `/categories/edit/${id}`, 
                method: "PUT",
                body: rest,
            }),
            invalidatesTags : ['Categorie'],
        }),
        deleteCategorie: builder.mutation<void, number>({
            query: (id) => ({
                url: `/categories/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags : ['Categorie'],
        })
    })
});

export const {
    useListeAllCategoriesQuery,
    useListeCategoriesMutation,
    useDetailsCategorieQuery,
    useAddCategorieMutation,
    useUpdateCategorieMutation,
    useDeleteCategorieMutation,
} = categorieApi;