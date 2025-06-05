import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { DashboardResponse, VendorDashboardResponse } from "../../types/api-types/dashboard/dashboard.types";
import { apiSlice } from "../api/apiSlice";
 

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getAdminDashboardData: builder.query<DashboardResponse, void>({
      query: () => ({
        url: `/admin/dashboard/stats`,
      }),
      providesTags: ["Dashboard"],
    }),
    getVendorDashboardData: builder.query<VendorDashboardResponse,void>({
      query: () => ({
        url: `/vendor/dashboard/stats`,
      }),
      providesTags: ["Dashboard"],
     }),
  }),
});

export const {
  useGetAdminDashboardDataQuery,
  useGetVendorDashboardDataQuery,
} = dashboardApi;