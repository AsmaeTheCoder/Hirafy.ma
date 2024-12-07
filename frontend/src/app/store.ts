import { configureStore } from '@reduxjs/toolkit';
import {authApi} from "../services/authApi";
import authReducer from "../features/authSlice1"
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { categorieApi } from '../services/categorieApi';
import { artisanApi } from '../services/artisanApi';
import { userApi } from '../services/userApi';
import { cdnApi } from '../services/cdnApi';
import { contactUsApi } from '../services/contactUsApi';
import { reclamationApi } from '../services/reclamationApi';
import { reviewApi } from '../services/reviewApi';
import { galleryApi } from '../services/galleryApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [categorieApi.reducerPath]: categorieApi.reducer,
    [artisanApi.reducerPath]: artisanApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cdnApi.reducerPath]: cdnApi.reducer,
    [reclamationApi.reducerPath]: reclamationApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [contactUsApi.reducerPath]: contactUsApi.reducer,
    [galleryApi.reducerPath]: galleryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, categorieApi.middleware, artisanApi.middleware, userApi.middleware, cdnApi.middleware, contactUsApi.middleware, reclamationApi.middleware, reviewApi.middleware, galleryApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
