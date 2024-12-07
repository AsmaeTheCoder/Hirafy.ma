import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Review } from "../models/review.model";

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://127.0.0.1:7004",
        prepareHeaders: (headers, { getState }) => {
            headers.set('Accept', 'application/json')
            return headers;
        },
        credentials: "include"
    }),
    tagTypes: ['Review'],
    endpoints: (builder) => ({
        listeReviews: builder.mutation({
            query: ({page, perPage}) => {
                const perPageSize = Number(perPage);
                return{
                    url: `/reviews/listReview?per-page=${perPageSize}&page=${page}`,
                    method: "get"
                }
            },
            invalidatesTags: ['Review'],
        }),
        listeReviewsByArtisan: builder.mutation({
            query: ({id, page, perPage}) => {
                const perPageSize = Number(perPage);
                return{
                    url: `/reviews/listReviewsByArtisans/${id}?per-page=${perPageSize}&page=${page}`,
                    method: "get"
                }
            },
            invalidatesTags: ['Review'],
        }),
        detailsReviews: builder.query<Review, string>({
            query: (id) => `/reviews/detailsReview/${id}`,
            providesTags : ['Review'],
        }),
        addReview: builder.mutation<{}, Review>({
            query: (review) => ({
                url: "/reviews/addReview",
                method: "POST",
                body: review,
            }),
            invalidatesTags : ['Review'],
        }),
        updateReview: builder.mutation<void, Review>({
            query: ({ id, ...rest }) => ({
                url: `/reviews/modifiereReview/${id}`, 
                method: "PUT",
                body: rest,
            }),
            invalidatesTags : ['Review'],
        }),
        deleteReview: builder.mutation<void, number>({
            query: (id) => ({
                url: `/reviews/supprimerReview/${id}`,
                method: "DELETE",
            }),
            invalidatesTags : ['Review'],
        })
    })
});

export const {
    useListeReviewsMutation,
    useListeReviewsByArtisanMutation,
    useDetailsReviewsQuery,
    useAddReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;