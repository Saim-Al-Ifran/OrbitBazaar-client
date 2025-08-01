import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { GetAllUserOrdersParams, GetAllUserOrdersResponse, GetVendorOrdersResponse, PlaceOrderRequest, PlaceOrderResponse } from "../../types/api-types/orders/orders.type";
import { apiSlice } from "../api/apiSlice";

const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getVendorOrders: builder.query<GetVendorOrdersResponse, { page?: number; limit?: number; sort?: string }>({
            query: ({ page, limit, sort } = {}) => {
                let base = `/orders/vendor`;
                const params = new URLSearchParams();
                if (page) params.append('page', page.toString());
                if (limit) params.append('limit', limit.toString());
                if (sort) params.append('sort', sort.toString());
                const queryString = params.toString();
                return queryString ? `${base}?${queryString}` : base;
            },
            providesTags:['Orders'],
        }),
        editOrderStatus: builder.mutation<any, { orderId: string; status: string }>({
            query: ({ orderId, status }) => ({
                url: `/orders/vendor/${orderId}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Orders'],
        }),
        placeOrder:builder.mutation<PlaceOrderResponse,PlaceOrderRequest>({
            query:(data)=>({
                url:'/orders',
                method:'POST',
                body:data
            })
        }),
        getAllUserOrders: builder.query<GetAllUserOrdersResponse,GetAllUserOrdersParams>({
            query: ({ page, limit, sort } = {}) => {
                let base = `/orders/user`;
                const params = new URLSearchParams();
                if (page) params.append('page', page.toString());
                if (limit) params.append('limit', limit.toString());
                if (sort) params.append('sort', sort.toString());
                const queryString = params.toString();
                return queryString ? `${base}?${queryString}` : base;
            },
            providesTags: ['Orders'],
        }),
        getSingleUserOrder: builder.query<any, string>({
            query: (orderId) => `/orders/user/${orderId}`,
            providesTags: (_result, _error, orderId) => [{ type: 'Order', id: orderId }],
        })
                
    }),
});

export const {
    useGetVendorOrdersQuery,
    useEditOrderStatusMutation,
    usePlaceOrderMutation,
    useGetAllUserOrdersQuery,
    useGetSingleUserOrderQuery
} = ordersApi;