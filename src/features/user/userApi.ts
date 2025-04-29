import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import {
  ProfileResponse,
  UpdateProfileRequest,
  ProfileUpdateResponse,
  VendorListResponse,
} from "../../types/api-types";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getUserProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: `/user/profile`,
      }),
      providesTags: ["UserProfile"],
    }),
    updateUserProfile: builder.mutation<ProfileUpdateResponse, UpdateProfileRequest>({
      query: (profileData) => ({
        url: `/users/profile`,
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    updateUserProfileImage: builder.mutation<ProfileUpdateResponse, FormData>({
      query: (formData) => ({
        url: `/user/profile-image`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["UserProfile"],
    }),
    getSellerRequest: builder.query<VendorListResponse,void>({
      query: () => ({
        url: `admin/users?role=vendor`,
      }),
    })
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserProfileImageMutation,
 
} = userApi;
