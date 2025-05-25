import { PaginationMeta } from "../common/pagination.types";
 
export interface SubmitReportRequest {
  productId: string;
  reason: string;
  comment: string;
}

export interface SubmitReportResponse {
  message: string;
  reportId: string;
}


export interface Report {
  _id: string;
  productID: {
    _id: string;
    name: string;
    vendorEmail: string;
    images: string[];
    
  };
  userEmail: string;
  reason: string;
  comment: string;
  status: 'pending' | 'resolve' | 'reject';
  createdAt: string;
  updatedAt: string;
}

export interface VendorReportsResponse {
  success: boolean;
  message: string;
  data: Report[];
  pagination: PaginationMeta;
}
export interface VendorSingleReportResponse {
  success: boolean;
  message: string;
  data: Report;
}
export interface UserSingleReportResponse {
  success: boolean;
  message: string;
  data: Report;
}

export interface VendorReportRequestParams {
  page?: number;
  limit?: number;
  sort?: string;
}
export interface DeleteReportResponse {
  message: string;
}

export interface UserUpdateReportResponse {
  _id: string;
  productID: string;
  userEmail: string;
  reason: string;
  comment: string;
  status: 'pending' | 'resolve' | 'reject';
  createdAt: string;
  updatedAt: string;
}
export interface UserUpdateReportRequest {
  id: string;
  data: {
     status: 'pending' | 'resolve' | 'reject';
  };
}

export interface UpdateVendorReportStatusResponse {
  message: string;
  report: Report;
}

export interface UpdateVendorReportStatusRequest {
  reportId: string;
  status: 'pending' | 'resolve' | 'reject';
}