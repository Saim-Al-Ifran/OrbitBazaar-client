import { Order } from "./api-types/orders/orders.type";

export interface ILoginFormInput {
  email: string;
  password: string;
}
export interface IRegistrationFormInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: string; 
  }

export interface AuthState {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
  }

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  role: "user" | "admin" | "vendor" | "super-admin";
  image?: string;
}

export interface UserTableProps {
  users: UserInfo[]; 
}

export interface SellerInfo extends UserInfo {
    vendorRequestStatus: string;
}
export interface SellerTableProps {
  // other properties
  sellers: SellerInfo[];
}


export interface OrderInfo extends Order {}


export interface OrdersTableProps {
  orders: OrderInfo [];
}