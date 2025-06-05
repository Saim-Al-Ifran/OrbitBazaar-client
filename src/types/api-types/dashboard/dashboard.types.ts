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
