 
import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
 
import { Dispatch } from "redux";
import { userLoggedIn} from './authSlice';
import {
  LoginInput,
  LoginResponse,
  RefreshTokenInput,
  RefreshTokenResponse,
  UserRegisterInput,
  UserRegisterResponse,
  VendorRegisterInput,
  VendorRegisterResponse
} from "../../types/api-types/auth/auth.types";
import { FirebaseLoginInput } from "../../types/api-types/auth/firebase.types";
import { ChangePasswordRequest, ChangePasswordResponse } from "../../types/api-types/profile/profile.types";

 

 
const handleLoginSuccess = (result: LoginResponse, dispatch: Dispatch) => {
  const { user } = result?.data;
  console.log("Login result:", result);
  
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
    firebaseUserLogin: builder.mutation<LoginResponse, FirebaseLoginInput>({
      query: (credentials) => ({
        url: "/auth/firebase_login",
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
      }
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
    registerUser: builder.mutation<UserRegisterResponse, UserRegisterInput>({
      query: (credentials) => ({
        url: "/auth/users/register",
        method: "POST",
        body: credentials,
      }),
    }),
 
    vendorRegister: builder.mutation<VendorRegisterResponse, VendorRegisterInput>({
      query: (credentials) => ({
        url: "/auth/vendors/register",
        method: "POST",
        body: credentials,
      }),
    }),
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
          query: (credentials) => ({ 
            url: `/auth/reset_password`,
            method: "PUT",
            body: credentials,
          }),
        }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("user");
          dispatch(userLoggedIn({ user: null }));
        } catch (err) {
          console.error('Logout failed:', err);
        }
      }
    })
  }),
 
    
});

export const {
  useAdminLoginMutation,
  useUserLoginMutation,
  useVendorRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useRegisterUserMutation,
  useFirebaseUserLoginMutation,
  useChangePasswordMutation,
} = authApi;
