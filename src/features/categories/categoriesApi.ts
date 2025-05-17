import { apiSlice } from "../api/apiSlice";
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import {
  AdminCategoryRequest,
  AdminCategoryResponse,
  CategoriesResponse,
  CategoryCreateResponse,
  CategoryUpdateInput,
  CategoryUpdateResponse,
  DeleteCategoryResponse,
  SingleCategoryResponse
} from "../../types/api-types/category/category.types";

const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({

    // GET all categories for admin (paginated)
    getAdminCategories: builder.query<AdminCategoryResponse, AdminCategoryRequest>({
      query: ({ page, limit, search } = {}) => {
        let base = '/admin/categories';
        const params = new URLSearchParams();

        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());
        if (search) params.append('search', search);

        const queryString = params.toString();
        return queryString ? `${base}?${queryString}` : base;
      },
      providesTags: ['Categories'],
    }),

    // GET all categories (public)
    getCategories: builder.query<CategoriesResponse, void>({
      query: () => '/categories',
      providesTags: ['Categories'],
    }),

    // GET a single category by ID
    getSingleCategory: builder.query<SingleCategoryResponse, string>({
      query: (id) => `/admin/categories/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Category', id }],
    }),

    // POST create a new category
    createCategory: builder.mutation<CategoryCreateResponse, FormData>({
      query: (category) => ({
        url: '/admin/categories',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Categories'],
    }),

    // PUT update category
    updateCategory: builder.mutation<CategoryUpdateResponse, CategoryUpdateInput>({
      query: ({ id, category }) => ({
        url: `/admin/categories/${id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Category', id },
        'Categories',
      ],
    }),

    // DELETE category
    deleteCategory: builder.mutation<DeleteCategoryResponse, string>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Category', id },
        'Categories',
      ],
    }),
  }),
});

export const {
  useGetAdminCategoriesQuery,
  useGetCategoriesQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;

export default categoriesApi;
