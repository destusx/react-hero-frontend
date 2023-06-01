import { configureStore } from '@reduxjs/toolkit';
import { heroesApi } from '../services/heroes';
import authSlice from './authSlice';

export const store = configureStore({
    reducer: { auth: authSlice, [heroesApi.reducerPath]: heroesApi.reducer },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(heroesApi.middleware),
});
