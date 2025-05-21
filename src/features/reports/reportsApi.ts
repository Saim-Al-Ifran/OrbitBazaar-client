import {
    DeleteReportResponse,
    SubmitReportRequest,
    SubmitReportResponse,
    UpdateVendorReportStatusRequest,
    UpdateVendorReportStatusResponse,
    UserSingleReportResponse,
    UserUpdateReportRequest,
    UserUpdateReportResponse,
    VendorReportRequestParams,
    VendorReportsResponse,
    VendorSingleReportResponse
} from "../../types/api-types/reports/reports.types";
import { apiSlice } from "../api/apiSlice";

const reportsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        submitReport: builder.mutation<SubmitReportResponse,SubmitReportRequest>({
            query: (reportData) => ({
                url: `/reports`,
                method: "POST",
                body: reportData,
            }),
        }),
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
        }),
        deleteVendorReport: builder.mutation<DeleteReportResponse,void>({
            query: (id) => ({
                url: `/reports/user/${id}`,
                method: "DELETE",
            }),
        }),
        userUpdateReport: builder.mutation<UserUpdateReportResponse,UserUpdateReportRequest>({
            query: ({ id, data }) => ({
                url: `/reports/user/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
        getUserReportsData: builder.query<UserSingleReportResponse,string>({
            query: (id) => ({
                url: `/reports/user/${id}`,
            }),
        }),
        updateVendorReportStatus: builder.mutation<UpdateVendorReportStatusResponse,UpdateVendorReportStatusRequest>({
            query: ({ id, status }) => ({
                url: `/reports/vendor/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
        }),

    }),
});

export const {
    useGetVendorReportsDataQuery,
    useGetSingleVendorReportDataQuery,
    useGetUserSingleReportDataQuery,
    useDeleteVendorReportMutation,
    useUserUpdateReportMutation,
    useGetUserReportsDataQuery,
    useUpdateVendorReportStatusMutation,
    useSubmitReportMutation,
} = reportsApi;
