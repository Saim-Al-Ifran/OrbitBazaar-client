 
import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import {
  LoginInput,
  LoginResponse,
  RefreshTokenInput,
  RefreshTokenResponse,
  UserRegisterInput,
  UserRegisterResponse,
  VendorRegisterInput,
  VendorRegisterResponse,
} from "../../types/api-types";
import { Dispatch } from "redux";
import { userLoggedIn} from './authSlice';

 

 
const handleLoginSuccess = (result: LoginResponse, dispatch: Dispatch) => {
  const { user } = result?.data;
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
     dispatch(userLoggedIn({ user }));
  }
};

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    adminLogin: builder.mutation<LoginResponse, LoginInput>({
      query: (credentials) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          handleLoginSuccess(result?.data, dispatch);
        } catch (err) {
          console.error('Login failed:', err);
        }
      },
    }),
    userLogin: builder.mutation<LoginResponse, LoginInput>({
      query: (credentials) => ({
        url: "/auth/users/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          handleLoginSuccess(result?.data, dispatch);
        } catch (err) {
          console.error('Login failed:', err);
        }
      },
    }),
    refreshToken: builder.mutation<RefreshTokenResponse , RefreshTokenInput>({
      query: (credentials) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
           handleLoginSuccess(result?.data, dispatch);
        } catch (err) {
          console.error('Refresh token failed:', err);
        }
      }
    }),
    userRegister: builder.mutation<UserRegisterResponse, UserRegisterInput>({
      query: (credentials) => ({
        url: "/users/register",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
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
  useRefreshTokenMutation,
  useGetUserQuery
} = authApi;
