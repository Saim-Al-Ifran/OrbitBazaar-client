import { PaginationMeta } from '../common/pagination.types';
import { UserRequestParams } from './user.types';

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

export interface UpdateVendorStatusInput {
  id: string;
  data: {
    status: string;
  };
}

export interface UpdatedVendor {
  id: string;
  name: string;
  email: string;
  vendorRequestStatus: string;
  updatedAt: string;
}

export interface UpdateVendorStatusResponse {
  success: boolean;
  message: string;
  data: UpdatedVendor;
}
export interface vendorRequestParams extends UserRequestParams{};