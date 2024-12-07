import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CDN } from "../models/cdn.model";


export const cdnApi = createApi({
    reducerPath: "cdnApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:7000" }),
    tagTypes: ['CDN'],
    endpoints: (builder) => ({
        uploadFile: builder.mutation({
            query: (file: File) => {
                const formData = new FormData();
                formData.append('image', file);
                return {
                    url: "/fileCDN",
                    method: "POST",
                    body: formData,
                };              
            },
            invalidatesTags : ['CDN'],
        })
    })
});

export const {
    useUploadFileMutation,
} = cdnApi;