import Cookies from 'js-cookie';
import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import {
  LoginInput,
  LoginResponse,
  UserRegisterInput,
  UserRegisterResponse,
  VendorRegisterInput,
  VendorRegisterResponse,
} from "../../types/api-types";
import { Dispatch } from "redux";
import { userLoggedIn, userLoggedOut } from './authSlice';

const TOKEN_LIFETIME_MS = 60 * 60 * 1000; // 1 hour

const clearToken = (dispatch: Dispatch) => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('tokenExpiry');
  dispatch(userLoggedOut());
};

const handleLoginSuccess = (result: LoginResponse, dispatch: Dispatch) => {
  const { accessToken, refreshToken, user } = result.data;
 
  if (accessToken && user) {
    // Set token in cookies
    Cookies.set('accessToken', accessToken, { expires: 1 / 24 }); // 1 hour
    Cookies.set('refreshToken', refreshToken, { expires: 7 }); // 7 days

    // Set in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    const expiryTime = Date.now() + TOKEN_LIFETIME_MS;
    localStorage.setItem('tokenExpiry', expiryTime.toString());

    // Set in Redux
    dispatch(userLoggedIn({ accessToken, user }));

    // Auto-logout after 1 hour
    setTimeout(() => {
      clearToken(dispatch);
    }, TOKEN_LIFETIME_MS);
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
          handleLoginSuccess(result.data, dispatch);
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
          handleLoginSuccess(result.data, dispatch);
        } catch (err) {
          console.error('Login failed:', err);
        }
      },
    }),
    userRegister: builder.mutation<UserRegisterResponse, UserRegisterInput>({
      query: (credentials) => ({
        url: "//users/register",
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
