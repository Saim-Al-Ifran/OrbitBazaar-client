import { PaginationMeta } from '../common/pagination.types';

export interface Category {
  _id: string;
  name: string;
  image: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export interface SingleCategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}

export interface DeleteCategoryResponse {
  success: boolean;
  message: string;
}

export interface AdminCategoryResponse {
  success: boolean;
  message: string;
  data: Category[];
  pagination: PaginationMeta;
}

export interface AdminCategoryRequest {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CategoryCreateInput {
  name: string;
  description?: string;
  image?: File;
}

export interface CategoryCreateResponse {
  success: boolean;
  message: string;
  data: Category;
}

export interface CategoryUpdateInput {
  id: string;
  category: FormData;
}

export interface CategoryUpdateResponse extends CategoryCreateResponse {}