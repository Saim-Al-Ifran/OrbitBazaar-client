import React from 'react';
import { useGetAdminDashboardDataQuery } from '../../../../features/dashboard/dashboardApi';
import DashboardStats from '../../../../components/Admin/Dashboard/DashboardStats';
import MonthlyRevenueChart from '../../../../components/Admin/Dashboard/MonthlyRevenueChart';
import MonthlySignupsChart from '../../../../components/Admin/Dashboard/MonthlySignupsChart';
import { PacmanLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';
 

const AdminDashboard: React.FC = () => {
  const { data, isLoading, isError } = useGetAdminDashboardDataQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader />
      </div>
    );
  }
  if (isError || !data?.success) return <p className="text-center mt-10 text-red-500">Failed to load dashboard data.</p>;

  const stats = data.data;

  return (
    <>
    <Helmet>
       <title>Dashboard - Admin</title>
    </Helmet>

     <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <DashboardStats stats={stats} />

      <MonthlyRevenueChart data={stats.monthlyRevenue} />
      <MonthlySignupsChart data={stats.monthlySignups} />
    </div>
    </>

  );
};

export default AdminDashboard;
