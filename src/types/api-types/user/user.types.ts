import { PaginationMeta } from '../common/pagination.types';

// Generic user (excluding vendors and admin)
export interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'user';
  status: 'active' | 'inactive';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// List users (can reuse VendorListResponse structure)
export interface UserListResponse {
  success: boolean;
  message: string;
  data: User[];
  pagination: PaginationMeta;
}

// Status update request
export interface UpdateUserStatusRequest {
  id: string;
  data: {
    status: string;
  };
}

// Status update response
export interface UpdateUserStatusResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    updatedAt: string;
  };
}

// Generic delete entity response (can be reused)
export interface DeleteEntityResponse {
  success: boolean;
  message: string;
}

// For user search/sort/pagination (admin panel usage)
export interface UserRequestParams {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
}
