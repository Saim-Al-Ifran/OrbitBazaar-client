export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginationMeta {
  totalRecords: number;
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  currentPage: number;
}

// Auth
export interface LoginInput {
  email: string;
  password: string;
}

export interface UserRegisterInput {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
    };
  };
}

export interface UserRegisterResponse extends LoginResponse {}
export interface VendorRegisterResponse extends LoginResponse {}
export interface VendorRegisterInput extends UserRegisterInput {}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface RefreshTokenResponse extends LoginResponse {}

export interface FirebaseLoginInput {
  idToken: string;
}

// Profile
export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    image: string;
    firebaseUID: string;
    role: string;
  };
}

export interface UpdateProfileRequest {
  name: string;
  phoneNumber: string;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

// Categories
export interface Category {
  id: string;
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
  category: {
    name?: string;
    description?: string;
    image?: File; 
  };
}
export interface CategoryUpdateResponse  extends CategoryCreateResponse {}

export interface VendorUser {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: 'vendor';
  status: 'active' | 'inactive';
  vendorRequestStatus: 'requested' | 'approved' | 'rejected';
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface VendorListResponse {
  success: boolean;
  message: string;
  data: VendorUser[];
  pagination: PaginationMeta;
}