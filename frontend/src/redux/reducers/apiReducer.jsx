import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a base query function that will set headers dynamically
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api/',
    prepareHeaders: (headers, { getState }) => {
        const state = getState(); // Access the entire state
        const token = state.auth.access; // Access the token from the state

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

// Create an API service
export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({
        getAllPost: builder.query({
            query: () => 'posts/',
        }),
        getAllRequest: builder.query({
            query: () => 'get-friends-request/',
        }),
        getPost: builder.query({
            query: (id) => `post/${id}`,
        }),
        getVisitorUserInfo: builder.query({
          query: (id) => `info/${id}`,
      }),
        getPostWithTheSameType: builder.query({
            query: (type) => `post/type/${type}`,
        }),
        getUserInfo: builder.query({
            query: () => 'info/',
        }),
        getUserPastCollaborations: builder.query({
          query: () => 'friends/',
      }),
        sendLoginRequest: builder.mutation({
            query: (data) => ({
                url: 'token/obtain/',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response, meta) => ({
                data: response,
                status: meta.response.status,
            }),
        }),
        sendEchangeRequest: builder.mutation({
            query: (data) => ({
                url: 'friend-request/',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response, meta) => ({
                data: response,
                status: meta.response.status,
            }),
        }),
        deletePastCollaborationHistory: builder.mutation({
            query: (data) => ({
                url: 'friends/delete',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response, meta) => ({
                data: response,
                status: meta.response.status,
            }),
        }),
        acceptEchangeRequest: builder.mutation({
            query: (data) => ({
                url: 'friend-request/accept/',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response, meta) => ({
                data: response,
                status: meta.response.status,
            }),
        }),
        sendLogoutRequest: builder.mutation({
            query: (data) => ({
                url: 'logout/',
                method: 'POST',
                body: data,
            }),
        }),
        sendChangePasswordRequest: builder.mutation({
            query: (data) => ({
                url: 'change_password/',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response, meta) => ({
                data: response,
                status: meta.response.status,
            }),
        }),
        sendRefreshToken: builder.mutation({
            query: (data) => ({
                url: 'token/refresh/',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response, meta) => ({
                data: response,
                status: meta.response.status,
            }),
        }),

        sendAddPostRequest: builder.mutation({
            query: (data) => ({
                url: 'posts/',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response, meta) => ({
                data: response,
                status: meta.response.status,
            }),
            transformErrorResponse: (response) => {
                // This allows you to customize how errors are transformed
                return response.data;
              },
        }),
        sendRegisterUserRequest: builder.mutation({
            query: (data) => ({
                url: 'register/',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response, meta) => ({
                data: response,
                status: meta.response.status,
            }),
            transformErrorResponse: (response) => {
                // This allows you to customize how errors are transformed
                return response.data;
              },
        }),
        sendAddInfoRequest: builder.mutation({
            query: (data) => ({
                url: 'add_info/',
                method: 'POST',
                body: data,
            }),
            transformResponse: (response, meta) => ({
                data: response,
                status: meta.response.status,
            }),
            transformErrorResponse: (response) => {
                // This allows you to customize how errors are transformed
                return response.data;
              },
        }),

        sendGetChartDataRequest: builder.query({
            query: () => "chart_data/",

            })
    }),
});

// Export hooks for usage in functional components
export const {
    useGetAllPostQuery,
    useGetAllRequestQuery,
    useGetUserPastCollaborationsQuery,
    useGetVisitorUserInfoQuery,
    useSendGetChartDataRequestQuery,
    useSendLogoutRequestMutation,
    useAcceptEchangeRequestMutation,
    useSendEchangeRequestMutation,
    useGetPostQuery,
    useGetPostWithTheSameTypeQuery,
    useGetUserInfoQuery,
    useDeletePastCollaborationHistoryMutation,
    useSendLoginRequestMutation,
    useSendChangePasswordRequestMutation,
    useSendRefreshTokenMutation,
    useSendRegisterUserRequestMutation,
    useSendAddInfoRequestMutation,
    useSendAddPostRequestMutation
} = api;
