import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const heroesApi = createApi({
    reducerPath: 'heroesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4444',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.data?.token;
            if (token) {
                headers.set('authorization', `Token ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Heroes'],
    endpoints: builder => ({
        getHeroes: builder.query({
            query: ({ limit = 5, skip = 0 }) =>
                `/heroes/?limit=${limit}&skip=${skip}`,
            providesTags: ({ heroes }) =>
                heroes
                    ? [
                          ...heroes.map(({ id }) => ({ type: 'Heroes', id })),
                          { type: 'Heroes', id: 'LIST' },
                      ]
                    : [{ type: 'Heroes', id: 'LIST' }],
        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero,
            }),
            invalidatesTags: ['Heroes'],
        }),
        updateHero: builder.mutation({
            query: data => ({
                url: `/hero/${data.slug}`,
                method: 'PUT',
                body: data.newHero,
            }),
            invalidatesTags: ['Heroes'],
        }),
        deleteHero: builder.mutation({
            query: slug => ({
                url: `/hero/${slug}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Heroes'],
        }),
        getSingleHero: builder.query({
            query: slug => `/hero/${slug}`,
            providesTags: ['Heroes'],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetHeroesQuery,
    useCreateHeroMutation,
    useGetSingleHeroQuery,
    useDeleteHeroMutation,
    useUpdateHeroMutation,
} = heroesApi;
