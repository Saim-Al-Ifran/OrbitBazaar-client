import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import {
  ProfileResponse,
  UpdateProfileRequest,
  ProfileUpdateResponse,
  VendorListResponse,
  UpdateUserStatusResponse,
  UpdateUserStatusRequest,
  CreateUserResponse,
  CreateUserInput,
  UpdateVendorStatusResponse,
  UpdateVendorStatusInput,
  UpdateUserRoleResponse,
  UpdateUserRoleInput,
  DeleteUserResponse,
  DeleteEntityResponse,
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
        url: `admin/users?vendorRequestStatus=requested&role=vendor`,
      }),
    }),
    getSeller:builder.query<VendorListResponse,void>({
      query: () => ({
        url: `admin/users?vendorRequestStatus=approved&role=vendor`,
      }),
    }),
    getDeactivatedUser:builder.query<VendorListResponse,void>({
      query: () => ({
        url: `admin/users?status=block`,
      }),
    }),
    updateUserStatus: builder.mutation<UpdateUserStatusResponse, UpdateUserStatusRequest>({
      query: ({ id }) => ({
        url: `/admin/users/${id}/status`,
        method: 'PATCH', 
      }),
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserInput>({
      query: (user) => ({
        url: '/admin/users',
        method: 'POST',
        body: user,
      }),
      
    }),
    updateVendorStatus: builder.mutation<UpdateVendorStatusResponse, UpdateVendorStatusInput>({
      query: ({ id, status }) => ({
        url: `/admin/vendors/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
    }),
    updateUserRole: builder.mutation<UpdateUserRoleResponse, UpdateUserRoleInput>({
      query: ({ id, role }) => ({
        url: `/super-admin/${id}/role`,
        method: 'PATCH',
        body: { role },
      }),
    }),
    deleteUser: builder.mutation<DeleteUserResponse, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: 'DELETE',
      }),
    }),
    deleteEntity: builder.mutation<DeleteEntityResponse, string>({
      query: (entityId) => ({
        url: `/super-admin/entity/${entityId}`,
        method: 'DELETE',
      }),
    }),
    
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserProfileImageMutation,
  useGetSellerQuery,
  useGetSellerRequestQuery,
  useGetDeactivatedUserQuery,
} = userApi;
