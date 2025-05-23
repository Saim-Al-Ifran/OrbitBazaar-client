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
    }),
});

export const {
    useGetVendorOrdersQuery,
    useEditOrderStatusMutation
} = ordersApi;