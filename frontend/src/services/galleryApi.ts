import {createApi} from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./api";

export interface Gallery {
    id?: string,
    image_path: string
};

export const galleryApi = createApi({
    reducerPath: "galleryApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Gallery'],
    endpoints: (builder) => ({
        listeGalleries: builder.query<Gallery[], void>({
            query: () => `/galleries/listeGaleries`,
            providesTags: ['Gallery'],
        }),
        detailsGallery: builder.query<Gallery, string>({
            query: (id) => `/galleries/show/${id}`,
            providesTags : ['Gallery'],
        }),
        addGallery: builder.mutation<{}, Gallery>({
            query: (gallery) => ({
                url: "/galleries/add",
                method: "POST",
                body: gallery,
            }),
            invalidatesTags: ['Gallery'],
        }),
        updateGallery: builder.mutation<void, Gallery>({
            query: ({id, ...rest}) => ({
                url: `/galleries/modifierGallery/${id}`,
                method: "PUT",
                body: rest,
            }),
            invalidatesTags: ['Gallery'],
        }),
        deleteGallery: builder.mutation<void, number>({
            query: (id) => ({
                url: `/galleries/supprimerGallery/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Gallery'],
        }),
    })
})

export const {
    useListeGalleriesQuery,
    useDetailsGalleryQuery,
    useAddGalleryMutation,
    useUpdateGalleryMutation,
    useDeleteGalleryMutation,
} = galleryApi;