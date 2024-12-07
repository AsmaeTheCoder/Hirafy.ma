import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ContactUs } from "../models/contactUs.model";

export const contactUsApi = createApi({
    reducerPath: "contactUsApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://127.0.0.1:7001",
        prepareHeaders: (headers, { getState }) => {
            headers.set('Accept', 'application/json')
            return headers;
        },
        credentials: "include"
    }),
    tagTypes: ['ContactUs'],
    endpoints: (builder) => ({
        // listeContact: builder.query<Utilisateur[], void>({
        //     query: () => "/contactezNous/listContactes",
        //     providesTags: ['ContactUs'],
        // }),
        listeContact: builder.mutation({
            query: ({page, perPage}) => {
                const perPageSize = Number(perPage);
                return {
                    url:`/contactezNous/listContactes?per-page=${perPageSize}&page=${page}`,
                    method: "get"
                }
            },
            invalidatesTags : ['ContactUs'],
        }),
        detailsContact: builder.query<ContactUs, string>({
            query: (id) => `/contactezNous/showContact/${id}`,
            providesTags : ['ContactUs'],
        }),
        addContactUs: builder.mutation<{}, ContactUs>({
            query: (user) => ({
                url: "/contactezNous/addContacte",
                method: "POST",
                body: user,
            }),
            invalidatesTags : ['ContactUs'],
        }),
    })
});

export const {
    useListeContactMutation,
    useDetailsContactQuery,
    useAddContactUsMutation,
} = contactUsApi;