import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import {
  ProfileResponse,
  UpdateProfileRequest,
  ProfileUpdateResponse,
} from "../../types/api-types";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getUserProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: `/user/profile`,
      }),
    }),
    updateUserProfile: builder.mutation<ProfileUpdateResponse, UpdateProfileRequest>({
      query: (profileData) => ({
        url: `/user/profile`,
        method: "PUT",
        body: profileData,
      }),
    }),
    updateUserProfileImage: builder.mutation<ProfileUpdateResponse, FormData>({
      query: (formData) => ({
        url: `/user/profile-image`,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserProfileImageMutation,
} = userApi;
