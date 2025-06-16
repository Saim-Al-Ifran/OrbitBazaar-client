import { PaginationMeta } from "../common/pagination.types";

export interface VendorProductsParams {
    page?: number;
    limit?: number;
    sort?: string;
    search?: string;
    filter?:string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    category:{
        _id: string;
        image: string;
        name: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    },
    vendorEmail: string;
    images: string[];
    price: number;
    stock: number;
    ratings: {
        average: number;
        count: number;
    };
    isFeatured: boolean;
    isArchived: boolean;
    salesCount: number;
    totalRevenue: number;
    analytics: {
        views: number;
        clicks: number;
    };
    createdAt: string;
    updatedAt: string;
}

export interface VendorProductsResponse {
    success: boolean;
    message: string;
    data: Product[];
    pagination: PaginationMeta;
}
export interface GetSingleProductResponse {
    success: boolean;
    message: string;
    product: Product;
}
export interface DeleteProductResponse {
    success: boolean;
    message: string;
}

 
export interface AddProductResponse {
    success: boolean;
    message: string;
    data: Product;
}

export interface UpdateProductResponse extends AddProductResponse {};
export interface ProductUpdateRequest {
    productId: string;
    productData: FormData;
}
export interface ArcheivedProductResponse extends AddProductResponse{};
export interface ProductInfo extends Product {}

export interface FeaturedProductsParams {
    page?: number;
    limit?: number;
    sort?: string;
}

export type FeaturedProductsResponse = {
  message: string;
  data: Product[];
  pagination: PaginationMeta;
};

export interface ProductsResponse  extends FeaturedProductsResponse {}
export interface ProductsParams {
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    category?: string;
        sort?: string;
}

 