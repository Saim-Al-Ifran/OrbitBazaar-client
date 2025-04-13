import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import { LoginInput, LoginResponse, UserRegisterInput, UserRegisterResponse, VendorRegisterInput, VendorRegisterResponse } from "../../types/api-types";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    adminLogin: builder.mutation<LoginResponse, LoginInput>({
      query: (credentials) => ({
        url: "/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    userLogin: builder.mutation<LoginResponse, LoginInput>({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    userRegister: builder.mutation<UserRegisterResponse, UserRegisterInput>({
      query: (credentials) => ({
        url: "/users/register",
        method: "POST",
        body: credentials,
      }),
    }),
    vendorRegister: builder.mutation<VendorRegisterResponse, VendorRegisterInput>({
      query: (credentials) => ({
        url: "/vendors/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useUserRegisterMutation,
  useUserLoginMutation,
  useVendorRegisterMutation,
} = authApi;
