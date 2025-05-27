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
        getProducts: builder.query<VendorProductsResponse,VendorProductsParams>({
            query: ({page,limit,sort,search} = {}) => {
                let base = `/vendor/products`;
                const params = new URLSearchParams();
                if (page) params.append('page', page.toString());
                if (limit) params.append('limit', limit.toString());
                if (sort) params.append('sort', sort.toString());
                if (search) params.append('search', search.toString());
                const queryString = params.toString();
                return queryString ? `${base}?${queryString}` : base;               
            },
            providesTags: ["Products"],
        }),
        getSingleProduct: builder.query<GetSingleProductResponse,{productId:string}>({
            query: (productId) => `products/${productId}`
        }),
        addProduct: builder.mutation<AddProductResponse, FormData>({
            query: (productData) => ({
                url: '/products',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: builder.mutation<UpdateProductResponse,ProductUpdateRequest>({
            query: ({ productId, productData }) => ({
                url: `products/${productId}`,
                method: 'PUT',
                body: productData,
            }),
            invalidatesTags: ["Products"],
        }),
        archeiveProduct: builder.mutation<ArcheivedProductResponse, { productId: string }>({
            query: ({ productId }) => ({
                url: `products/${productId}/archive`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation<DeleteProductResponse, { productId: string }>({
            query: ({ productId }) => ({
                url: `products/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Products"],
        })
    }),
});

export const {
    useGetProductsQuery,
    useGetSingleProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useArcheiveProductMutation,
    useDeleteProductMutation
} = productsApi;