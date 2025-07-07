// apiTypes.ts

import { PaginationMeta } from "../common/pagination.types";

export interface ShippingAddress {
  fullName: string;
  address: string;
  phoneNumber: string;
  city: string;
  postalCode: string;
  countryCode: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  vendorEmail: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  isArchived: boolean;
  salesCount: number;
  totalRevenue: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  ratings: {
    average: number;
    count: number;
  };
  analytics: {
    views: number;
    clicks: number;
  };
  images: string[];
}

export interface OrderItem {
  _id: string;
  productID: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  _id: string;
  userEmail: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalQuantity: number;
  totalPrice: number;
  status: 'confirmed' | 'processing' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetVendorOrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
  pagination:PaginationMeta;
}
 
export interface PlaceOrderItem {
  productID: string;  
  quantity: number;
  price: number;
  total: number;
}

export interface PlaceOrderRequest {
  items: PlaceOrderItem[]; 
  shippingAddress: ShippingAddress;
  totalQuantity: number;
  totalPrice: number;
}

export interface PlaceOrderResponse{
  message:string;
  orderId:string;
}


