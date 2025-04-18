// src/features/api/baseQuery.ts
import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";


const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers ) => {
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<any, unknown, unknown> = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);
 

  if (result.error?.status === 403  ) {
    api.dispatch(userLoggedOut());
    const refreshResult = await rawBaseQuery(
      { 
        url: "/auth/refresh_token", 
        method: "POST"
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const { accessToken, refreshToken: newRefreshToken, user } = (refreshResult.data as any).data;

      api.dispatch(userLoggedIn({
        accessToken,
        refreshToken: newRefreshToken,
        user,
      }));

      // Retry original query
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      console.error("Failed to refresh token", refreshResult.error);
      api.dispatch(userLoggedOut());
    }
  }

  return result;
};
