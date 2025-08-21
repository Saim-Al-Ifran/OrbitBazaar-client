export interface MonthlyRevenue {
  _id: number; // Month
  total: number;
}

export interface MonthlySignup {
  _id: number; // Month
  count: number;
}

export interface DashboardStats {
  totalUsers: number;
  totalVendors: number;
  totalProducts: number;
  totalOrders: number;
  activeVendors: number;
  deactiveVendors: number;
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenue[];
  monthlySignups: MonthlySignup[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardStats;
}

export interface VendorDashboardResponse {
  success: boolean;
  totalProducts: number;
  featuredProducts: number;
  totalViews: number;
  totalClicks: number;
  totalSales: number;
  totalRevenue: number;
  pendingReports: number;
  chartData: {
    month: string; // e.g., "January"
    revenue: number;
  }[];
}
export interface UserDashboardReponse {
  totalOrders: number;
  pendingOrders: number;
  totalSpent: number;
  reviewsSubmitted: number;
  recentOrders: RecentOrder[];
  chartData: ChartDataPoint[];
}

export interface RecentOrder {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string; // ISO date string
}

export interface OrderItem {
  _id: string;
  productID: Product;
  quantity: number;
  price: number;
  total: number;
}

export interface Product {
  _id: string;
  name: string;
  images: string[];
  createdAt: string; // ISO date string
}

export interface ChartDataPoint {
  month: string; // e.g. "7-2025"
  total: number;
}
