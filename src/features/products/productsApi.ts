// src/redux/features/productsApi.ts
import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import {
    AddProductResponse,
    ArcheivedProductResponse,
    DeleteProductResponse,
    GetSingleProductResponse,
    ProductUpdateRequest,
    UpdateProductResponse,
    VendorProductsParams,
    VendorProductsResponse
} from "../../types/api-types/products/products.type";

const productsApi = apiSlice.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getVendorProducts: builder.query<VendorProductsResponse, VendorProductsParams>({
            query: ({ page, limit, sort, search, filter } = {}) => {
                let base = `/vendor/products`;
                const params = new URLSearchParams();
                if (page) params.append('page', page.toString());
                if (limit) params.append('limit', limit.toString());
                if (sort) params.append('sort', sort.toString());
                if (search) params.append('search', search.toString());
                if (filter) params.append('filter', filter.toString());
                const queryString = params.toString();
                return queryString ? `${base}?${queryString}` : base;
            },
            providesTags: ["Products"],
        }),

        getSingleProduct: builder.query<GetSingleProductResponse, string>({
            query: (productId) => `products/${productId}`,
            providesTags: (_result, _error, productId) => [{ type: "Product", id: productId }],
        }),

        addProduct: builder.mutation<AddProductResponse, FormData>({
            query: (productData) => ({
                url: '/products',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: [{ type: "Products" }],
        }),

        updateProduct: builder.mutation<UpdateProductResponse, ProductUpdateRequest>({
            query: ({ productId, productData }) => ({
                url: `products/${productId}`,
                method: 'PUT',
                body: productData,
            }),
            invalidatesTags: (_result, _error, { productId }) => [
                { type: "Product", id: productId },
                "Products"
            ],
        }),

        archeiveProduct: builder.mutation<ArcheivedProductResponse, string>({
            query: (id) => ({
                url: `products/${id}/archive`,
                method: 'PATCH',
            }),
            invalidatesTags: [{ type: "Products" }],
        }),

        deleteProduct: builder.mutation<DeleteProductResponse, { productId: string }>({
            query: ({ productId }) => ({
                url: `products/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: "Products" }],
        }),
    }),
});

export const {
    useGetVendorProductsQuery,
    useGetSingleProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useArcheiveProductMutation,
    useDeleteProductMutation,
} = productsApi;
