import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { DashboardResponse,  UserDashboardReponse, VendorDashboardResponse } from "../../types/api-types/dashboard/dashboard.types";
import { apiSlice } from "../api/apiSlice";
 

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getAdminDashboardData: builder.query<DashboardResponse, void>({
      query: () => ({
        url: `/admin/dashboard/stats`,
      }),
      providesTags: ["AdminDashboard"],
    }),
    getVendorDashboardData: builder.query<VendorDashboardResponse,void>({
      query: () => ({
        url: `/vendor/dashboard/stats`,
      }),
      providesTags: ["VendorDashboard"],
     }),
    getUserDashboardData:builder.query<UserDashboardReponse, void>({
      query: () => ({
        url: `/user/dashboard/stats`,
      }),
      providesTags: ["UserDashboard"],
    }),
  }),
});

export const {
  useGetAdminDashboardDataQuery,
  useGetVendorDashboardDataQuery,
  useGetUserDashboardDataQuery,
} = dashboardApi;