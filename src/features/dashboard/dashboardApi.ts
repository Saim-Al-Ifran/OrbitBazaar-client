import { DashboardResponse } from "../../types/api-types";
import { apiSlice } from "../api/apiSlice";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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