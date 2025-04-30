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
  UserListResponse,
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
      invalidatesTags: ["UserProfile", "UserList"],
    }),

    updateUserProfileImage: builder.mutation<ProfileUpdateResponse, FormData>({
      query: (formData) => ({
        url: `/user/profile-image`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["UserProfile", "UserList"],
    }),

    getAllUsers: builder.query<UserListResponse, void>({
      query: () => ({
        url: `/admin/users`,
      }),
      providesTags: ["UserList"],
    }),

    getSellerRequest: builder.query<VendorListResponse, void>({
      query: () => ({
        url: `admin/users?vendorRequestStatus=requested&role=vendor`,
      }),
      providesTags: ["SellerRequest"],
    }),

    getSeller: builder.query<VendorListResponse, void>({
      query: () => ({
        url: `admin/users?vendorRequestStatus=approved&role=vendor`,
      }),
      providesTags: ["ApprovedVendors"],
    }),

    getDeactivatedUser: builder.query<VendorListResponse, void>({
      query: () => ({
        url: `admin/users?status=block`,
      }),
      providesTags: ["BlockedUsers"],
    }),

    updateUserStatus: builder.mutation<UpdateUserStatusResponse, UpdateUserStatusRequest>({
      query: ({ id }) => ({
        url: `/admin/users/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["UserList", "BlockedUsers"],
    }),

    createUser: builder.mutation<CreateUserResponse, CreateUserInput>({
      query: (user) => ({
        url: "/admin/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UserList"],
    }),

    updateVendorStatus: builder.mutation<UpdateVendorStatusResponse, UpdateVendorStatusInput>({
      query: ({ id, status }) => ({
        url: `/admin/vendors/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["SellerRequest", "ApprovedVendors"],
    }),

    updateUserRole: builder.mutation<UpdateUserRoleResponse, UpdateUserRoleInput>({
      query: ({ id, role }) => ({
        url: `/super-admin/${id}/role`,
        method: "PATCH",
        body: { role },
      }),
      invalidatesTags: ["UserList"],
    }),

    deleteUser: builder.mutation<DeleteUserResponse, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserList"],
    }),

    deleteEntity: builder.mutation<DeleteEntityResponse, string>({
      query: (entityId) => ({
        url: `/super-admin/entity/${entityId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserList"],
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
  useGetAllUsersQuery,
  useUpdateUserStatusMutation,
  useCreateUserMutation,
  useUpdateVendorStatusMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useDeleteEntityMutation,
} = userApi;
