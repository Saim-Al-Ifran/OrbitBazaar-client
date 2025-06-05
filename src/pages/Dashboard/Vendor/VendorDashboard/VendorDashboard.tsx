import { ClockLoader  } from 'react-spinners';
import RevenueChart from '../../../../components/Vendor/Dashboard/RevenueChart';
import VendorStats from '../../../../components/Vendor/Dashboard/VendorStats';
import { useGetVendorDashboardDataQuery } from '../../../../features/dashboard/dashboardApi';


export default function VendorDashboard() {
  const { data, isLoading, error } = useGetVendorDashboardDataQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClockLoader />
      </div>
    );
  }

  if (error || !data) {
    return <div className="text-center py-10 text-red-500">Failed to load dashboard data.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <VendorStats
        totalProducts={data.totalProducts}
        featuredProducts={data.featuredProducts}
        totalViews={data.totalViews}
        totalClicks={data.totalClicks}
        totalSales={data.totalSales}
        totalRevenue={data.totalRevenue}
        pendingReports={data.pendingReports}
      />
      <RevenueChart data={data.chartData} />
    </div>
  );
}
