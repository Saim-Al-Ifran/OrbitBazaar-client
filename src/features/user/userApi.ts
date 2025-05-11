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
  UserRequestParams,
  vendorRequestParams,
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

    getAllUsers: builder.query<UserListResponse, UserRequestParams>({
      query: ({ page, limit, search ,sort } = {}) => {
        let base = `/admin/users`;
        const params = new URLSearchParams();
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        if (sort) params.append('sort', sort.toString());
        if (search) params.append('search', search);

        const queryString = params.toString();
        return queryString ? `${base}?${queryString}` : base;
      },
      providesTags: ["UserList"],
    }),
    getSellers: builder.query<VendorListResponse, vendorRequestParams>({
      query: ({ page, limit, search ,sort } = {}) => {
        let base = `admin/users`;
        const params = new URLSearchParams();
        // Append query parameters to the URL
        params.append('vendorRequestStatus', 'approved');
        params.append('role', 'vendor');
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        if (sort) params.append('sort', sort.toString());
        if (search) params.append('search', search);

        const queryString = params.toString();
        return queryString ? `${base}?${queryString}` : base;
      },
      providesTags: ["ApprovedVendors"],
    }),

    getSellerRequest: builder.query<VendorListResponse, void>({
      query: () => ({
        url: `admin/users?vendorRequestStatus=requested&role=vendor`,
      }),
      providesTags: ["SellerRequest"],
    }),


    getDeactivatedUser: builder.query<VendorListResponse, void>({
      query: () => ({
        url: `admin/users?status=block`,
      }),
      providesTags: ["BlockedUsers"],
    }),

    updateUserStatus: builder.mutation<UpdateUserStatusResponse, UpdateUserStatusRequest>({
      query: ({ id , data}) => ({
        url: `/admin/users/${id}/status`,
        method: "PATCH",
        body:data
      }),
      invalidatesTags: ["UserList", "BlockedUsers","ApprovedVendors"],
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
      query: ({ id, data}) => ({
        url: `/admin/vendors/${id}/status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SellerRequest", "ApprovedVendors"],
    }),

    updateUserRole: builder.mutation<UpdateUserRoleResponse, UpdateUserRoleInput>({
      query: ({ id, data }) => ({
        url: `/super-admin/${id}/role`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["UserList","ApprovedVendors"],
    }),

    deleteUser: builder.mutation<DeleteUserResponse, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserList","ApprovedVendors"],
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
  useGetSellersQuery,
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
