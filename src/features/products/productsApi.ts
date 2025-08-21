// src/redux/features/productsApi.ts
import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import {
    AddProductResponse,
    ArcheivedProductResponse,
    DeleteProductResponse,
    FeaturedProductsParams,
    FeaturedProductsResponse,
    GetSingleProductResponse,
    ProductsParams,
    ProductsResponse,
    ProductsSearchParams,
    ProductUpdateRequest,
    UpdateProductResponse,
    VendorProductsParams,
    VendorProductsResponse
} from "../../types/api-types/products/products.type";

const productsApi = apiSlice.injectEndpoints({
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getAllProducts: builder.query<ProductsResponse, ProductsParams>({
            query: ({ page, limit , minPrice, maxPrice, category, sort } = {}) => {
                    const params = new URLSearchParams();

                    if (page) params.append('page', page.toString());
                    if (limit) params.append('limit', limit.toString());
                    if (minPrice) params.append('minPrice', minPrice.toString());
                    if (maxPrice) params.append('maxPrice', maxPrice.toString());
                    if (category) params.append('category', category);
                    if (sort) params.append('sort', sort);

                    return `products?${params.toString()}`;
            },
            providesTags: ["Products"],
        }),
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
        getPurchasedProducts: builder.query<ProductsResponse, ProductsParams>({
            query: ({ page, limit, sort } = {}) => {
                const params = new URLSearchParams();
                if (page) params.append('page', page.toString());
                if (limit) params.append('limit', limit.toString());
                if (sort) params.append('sort', sort.toString());
                return `/user/purchased-products?${params.toString()}`;
            },
            providesTags: ["PurchasedProducts"],
        }),
        getSearchProducts: builder.query<ProductsResponse, ProductsSearchParams>({
        query: ({ keyword, page, limit,sort }) => {
            const params = new URLSearchParams();
            if (keyword) params.append("keyword", keyword); // or "keyword"
            if (page) params.append("page", page.toString());
            if (limit) params.append("limit", limit.toString());
            if (sort) params.append("sort", sort.toString());
            return `products/search?${params.toString()}`;
        },
        providesTags: ["Products"],
        }),

        getSingleProduct: builder.query<GetSingleProductResponse, string>({
            query: (productId) => `products/${productId}`,
            providesTags: (_result, _error, productId) => [{ type: "Product", id: productId }],
        }),
        getFeauturedProducts: builder.query<FeaturedProductsResponse, FeaturedProductsParams>({
            query: ({ page, limit, sort } = {}) => {
                let base = `/products/featured`;
                const params = new URLSearchParams();
                if (page) params.append('page', page.toString());
                if (limit) params.append('limit', limit.toString());
                if (sort) params.append('sort', sort.toString());
                const queryString = params.toString();
                return queryString ? `${base}?${queryString}` : base;
            },
            providesTags: ["FeaturedProducts"],
        }),
        // Record a product view
        recordProductView: builder.mutation<{ message: string }, string>({
        query: (productId) => ({
            url: `products/${productId}/view`,
            method: "PATCH",
        }),
        invalidatesTags: (_result, _error, productId) => [
            { type: "Product", id: productId },
        ],
        }),
        // Record a product click
        recordProductClick: builder.mutation<{ message: string }, string>({
        query: (productId) => ({
            url: `products/${productId}/click`,
            method: "PATCH",
        }),
        invalidatesTags: (_result, _error, productId) => [
            { type: "Product", id: productId },
        ],
        }),
        addProduct: builder.mutation<AddProductResponse, FormData>({
            query: (productData) => ({
                url: '/products',
                method: 'POST',
                body: productData,
            }),
            invalidatesTags: ["Products", "PurchasedProducts"],
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
            invalidatesTags: ["Products"],
        }),
        markProductAsArchived: builder.mutation<ArcheivedProductResponse, {id:string,isArchived:boolean}>({
            query: ({id,isArchived}) => ({
                url: `products/${id}/archive`,
                body:{isArchived},
                method: 'PATCH'
            }),
            invalidatesTags: [ "Products"],
        }),
 
        deleteProduct: builder.mutation<DeleteProductResponse, { productId: string }>({
            query: ({ productId }) => ({
                url: `products/${productId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const {
    useGetVendorProductsQuery,
    useGetSingleProductQuery,
    useGetSearchProductsQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useArcheiveProductMutation,
    useDeleteProductMutation,
    useMarkProductAsArchivedMutation,
    useGetFeauturedProductsQuery,
    useGetAllProductsQuery,
    useGetPurchasedProductsQuery,
    useRecordProductViewMutation,
    useRecordProductClickMutation,
} = productsApi;
