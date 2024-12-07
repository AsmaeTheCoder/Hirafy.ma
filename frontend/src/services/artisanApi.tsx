import {createApi} from "@reduxjs/toolkit/query/react";
import { Artisan } from "../models/artisan.model";
import { baseQueryWithReauth } from "./api";
import { Utilisateur } from "../models/utilisateur.model";


interface GetArtisansParams {
    ville: string;
    id?: string;
    page: number;
    perPage: number;
  }

export const artisanApi = createApi({
    reducerPath: "artisanApi",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Artisan'],
    endpoints: (builder) => ({
        getArtisans: builder.query<Artisan[], GetArtisansParams>({
            query: ({ ville, id, page, perPage }) =>
              `Artisans/listeArtisans/${id}?page=${page}&ville=${ville}&per-page=${Number(perPage)}`,
        }),
        // Liste et Details Artisan vu par le tous
        // getArtisans: builder.query<Utilisateur[], number>({
        //     query: ({ ville, id, page, perPage}) => ({
        //         url: `/Artisans/listeArtisans/${id}?page=${page}&ville=${ville}&per-page=${perPage}`,
        //     }),
        //     transformResponse: responseData => {
        //         return responseData.artisans
        //     },
        //     providesTags : [ 'Artisan' ],
        // }),
        consulterArtisans: builder.mutation({
            query: ({ id, ville, page, perPage}) => {
                const perPageSize = Number(perPage);
                console.log(id);
                
                return {
                    url:`/Artisans/listeArtisans/${id}?ville=${ville}&page=${page}&per-page=${perPageSize}`,
                    method: "get"
                }
            },
            invalidatesTags : ['Artisan'],
        }),     
        showArtisan: builder.query<Artisan, number | string | void>({
            query: (id:number | string) => {
                return {
                    url: `/Artisans/show/${id}`,
                    method: "get"
                }
            }, 
            providesTags : [ 'Artisan' ],
        }),
    })
});

export const {
    // useConsulterArtisansQuery,
    useGetArtisansQuery,
    useConsulterArtisansMutation,
    useShowArtisanQuery,
} = artisanApi;