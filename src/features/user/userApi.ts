import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getUserProfile: builder.query({
      query: () => `/users/profile`,
    }),
 
  }),
});

export const {
    useGetUserProfileQuery
} = userApi;