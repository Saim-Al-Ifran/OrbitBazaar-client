import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { AdminCategoryRequest, AdminCategoryResponse, CategoriesResponse, CategoryCreateInput, CategoryCreateResponse, CategoryUpdateInput, CategoryUpdateResponse, DeleteCategoryResponse, SingleCategoryResponse } from "../../types/api-types";


const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({

    getAdminCategories: builder.query<AdminCategoryResponse,AdminCategoryRequest>({
      query: ({ page, limit, search } = {}) => {
        let base = '/admin/categories';
        const params = new URLSearchParams();
        
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        if (search) params.append('search', search);

        const queryString = params.toString();
        return queryString ? `${base}?${queryString}` : base;
      }
    }),
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => '/categories',
    }),
    getSingleCategory: builder.query<SingleCategoryResponse, string>({
      query: (id) => `/categories/${id}`,
    }),
    createCategory: builder.mutation<CategoryCreateInput,CategoryCreateResponse>({
      query: (category) => ({
        url: '/admin/categories',
        method: 'POST',
        body: category,
      }),
    }),
    updateCategory: builder.mutation<CategoryUpdateResponse,CategoryUpdateInput>({
      query: ({ id, category }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: category,
      }),
    }),
    deleteCategory: builder.mutation<DeleteCategoryResponse, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
 
});

export const {
  useGetAdminCategoriesQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;

export default categoriesApi;