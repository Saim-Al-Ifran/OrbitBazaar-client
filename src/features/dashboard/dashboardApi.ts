import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { DashboardResponse } from "../../types/api-types/dashboard/dashboard.types";
import { apiSlice } from "../api/apiSlice";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getAdminDashboardData: builder.query<DashboardResponse, void>({
      query: () => ({
        url: `/admin/dashboard/stats`,
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetAdminDashboardDataQuery,
} = dashboardApi;