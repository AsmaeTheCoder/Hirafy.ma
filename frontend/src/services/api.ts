import { FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { setUser } from "../features/authSlice1";
import { Utilisateur } from "../models/utilisateur.model";

export const baseFetch = fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000",
    credentials: 'include',
    prepareHeaders: (headers, {}) => {
        headers.set('Accept', 'application/json');
        headers.set('Access-Control-Allow-Origin', '*');
        return headers;
    },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseFetch(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseFetch({url: '/auth/refresh', method: 'POST'}, api, extraOptions)
    if (refreshResult.data) {
        const userResult = await baseFetch('/auth/current', api, extraOptions);
        api.dispatch(setUser(userResult.data as Utilisateur));
        result = await baseFetch(args, api, extraOptions)
    } else {
        await baseFetch({url: '/auth/logout', method: 'POST'}, api, extraOptions)
        api.dispatch(setUser(null));
    }
  }
  return result
}