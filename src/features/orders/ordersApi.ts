import { apiSlice } from "../api/apiSlice";

const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getVendorOrders: builder.query<any, { page?: number; limit?: number; sort?: string }>({
            query: ({ page, limit, sort } = {}) => {
                let base = `/orders/vendor`;
                const params = new URLSearchParams();
                if (page) params.append('page', page.toString());
                if (limit) params.append('limit', limit.toString());
                if (sort) params.append('sort', sort.toString());
                const queryString = params.toString();
                return queryString ? `${base}?${queryString}` : base;
            },
        }),
        editOrderStatus: builder.mutation<any, { id: string; data: string }>({
            query: ({ id, data }) => ({
                url: `/reports/vendor/${id}/status`,
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const { useGetVendorOrdersQuery } = ordersApi;