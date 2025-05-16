import React from 'react';
import {
  UserGroupIcon,
  BuildingStorefrontIcon,
  CubeIcon,
  ShoppingCartIcon,
  UserPlusIcon,
  UserMinusIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid';

interface StatCardProps {
  label: string;
  value: number;
  Icon: React.ElementType;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, Icon, bgColor }) => (
  <div className={`p-4 rounded-2xl shadow text-white  ${bgColor}`}>
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-md font-medium">{label}</h2>
      <Icon className="h-6 w-6" />
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const DashboardStats = ({ stats }: { stats: any }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard
        label="Total Users"
        value={stats.totalUsers}
        Icon={UserGroupIcon}
        bgColor="bg-[#306187]"
              />
      <StatCard
        label="Total Vendors"
        value={stats.totalVendors}
        Icon={BuildingStorefrontIcon}
        bgColor="bg-[#5E30A1]"
      />
      <StatCard
        label="Total Products"
        value={stats.totalProducts}
        Icon={CubeIcon}
        bgColor="bg-[#328E6E]"
      />
      <StatCard
        label="Total Orders"
        value={stats.totalOrders}
        Icon={ShoppingCartIcon}
        bgColor="bg-[#F75A5A]"
      />
      <StatCard
        label="Active Vendors"
        value={stats.activeVendors}
        Icon={UserPlusIcon}
        bgColor="bg-[#E78B48]"
      />
      <StatCard
        label="Inactive Vendors"
        value={stats.deactiveVendors}
        Icon={UserMinusIcon}
        bgColor="bg-[#102E50]"
      />
      <StatCard
        label="Total Revenue"
        value={stats.totalRevenue}
        Icon={CurrencyDollarIcon}
        bgColor="bg-[#1E1E1E]"
      />
    </div>
  );
};

export default DashboardStats;
