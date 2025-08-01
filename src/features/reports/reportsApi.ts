import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import {
    DeleteReportResponse,
    SubmitReportRequest,
    SubmitReportResponse,
    UpdateVendorReportStatusRequest,
    UpdateVendorReportStatusResponse,
    UserReportsResponse,
    UserSingleReportResponse,
    UserUpdateReportRequest,
    UserUpdateReportResponse,
    VendorReportRequestParams,
    VendorReportsResponse,
    VendorSingleReportResponse
} from "../../types/api-types/reports/reports.types";
import { apiSlice } from "../api/apiSlice";

const reportsApi = apiSlice.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getVendorReportsData: builder.query<VendorReportsResponse, VendorReportRequestParams>({
            query: ({page,limit,sort} = {}) => {
                let base = `/reports/vendor`;
                const params = new URLSearchParams();
                if (page) params.append('page', page.toString());
                if (limit) params.append('limit', limit.toString());
                if (sort) params.append('sort', sort.toString());
                const queryString = params.toString();
                return queryString ? `${base}?${queryString}` : base;
                
            },
            providesTags:["VendorReports"],
        }),
        getSingleVendorReportData: builder.query<VendorSingleReportResponse,string>({
            query: (id) => ({
                url: `/reports/vendor/${id}`,
            }),
        }),
        getUserSingleReportData: builder.query<UserSingleReportResponse,string>({
            query: (id) => ({
                url: `/reports/user/${id}`,
            }),
            providesTags: (_result, _error, id) => [{ type: 'UserReports', id }],
        }),
        getUserReportsData: builder.query<UserReportsResponse,{page:number,limit:number}>({
            query: ({page,limit}) => ({
                url: `/reports/user`,
                params: { page, limit }
            }),
            providesTags: ["UserReports"],
        }),
        getUserReportIDs: builder.query<{ data: string[] }, void>({
            query: () => ({
                url: `/reports/user_reported_Id`,
            }),
            providesTags: ["UserReportIDs"],
        }),

       submitReport: builder.mutation<SubmitReportResponse,SubmitReportRequest>({
            query: (reportData) => ({
                url: `/reports`,
                method: "POST",
                body: reportData,
            }),
            invalidatesTags: ["VendorReports", "UserReportIDs", "UserReports"],
        }),
       userUpdateReport: builder.mutation<UserUpdateReportResponse,UserUpdateReportRequest>({
            query: ({ id, data }) => ({
                url: `/reports/user/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["UserReports", "UserReportIDs", "VendorReports"],
        }),
        updateVendorReportStatus: builder.mutation<UpdateVendorReportStatusResponse,UpdateVendorReportStatusRequest>({
            query: ({ reportId, status }) => ({
                url: `/reports/vendor/${reportId}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (_result, _error, { reportId }) => [
                { type: 'VendorReports', id: reportId },
                { type: 'UserReports', id: reportId },
                "UserReports",
                "VendorReports",
            ],
        }),
        deleteReport: builder.mutation<DeleteReportResponse,string>({
            query: (id) => ({
                url: `/reports/user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["VendorReports", "UserReports", "UserReportIDs"],
        }),
    }),
});

export const {
    useGetVendorReportsDataQuery,
    useGetSingleVendorReportDataQuery,
    useGetUserSingleReportDataQuery,
    useDeleteReportMutation,
    useUserUpdateReportMutation,
    useGetUserReportsDataQuery,
    useUpdateVendorReportStatusMutation,
    useSubmitReportMutation,
    useGetUserReportIDsQuery
} = reportsApi;
