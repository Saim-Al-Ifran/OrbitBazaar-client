'use client';

import {
  CubeIcon,
  StarIcon,
  EyeIcon,
  CursorArrowRaysIcon,
  ShoppingCartIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

interface VendorStatsProps {
  totalProducts: number;
  featuredProducts: number;
  totalViews: number;
  totalClicks: number;
  totalSales: number;
  totalRevenue: number;
  pendingReports: number;
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  iconBg: string;
  cardBg: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, iconBg, cardBg }) => {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl p-5 text-white shadow hover:shadow-xl transition duration-300 ${cardBg}`}
    >
      <div className={`p-3 rounded-full ${iconBg}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm opacity-80 text-white">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const VendorStats: React.FC<VendorStatsProps> = ({
  totalProducts,
  featuredProducts,
  totalViews,
  totalClicks,
  totalSales,
  totalRevenue,
  pendingReports,
}) => {
  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      icon: CubeIcon,
      iconBg: 'bg-blue-500',
      cardBg: 'bg-blue-800',
    },
    {
      label: 'Featured Products',
      value: featuredProducts,
      icon: StarIcon,
      iconBg: 'bg-[#F69E5E]',
      cardBg: 'bg-[#E78B48]',
    },
    {
      label: 'Total Views',
      value: totalViews,
      icon: EyeIcon,
      iconBg: 'bg-purple-400',
      cardBg: 'bg-purple-700',
    },
    {
      label: 'Total Clicks',
      value: totalClicks,
      icon: CursorArrowRaysIcon,
      iconBg: 'bg-indigo-400',
      cardBg: 'bg-indigo-700',
    },
    {
      label: 'Total Sales',
      value: totalSales,
      icon: ShoppingCartIcon,
      iconBg: 'bg-green-400',
      cardBg: 'bg-green-700',
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: BanknotesIcon,
      iconBg: 'bg-[#424141]',
      cardBg: 'bg-[#1E1E1E]',
    },
    {
      label: 'Pending Reports',
      value: pendingReports,
      icon: ExclamationTriangleIcon,
      iconBg: 'bg-red-400',
      cardBg: 'bg-red-700',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          iconBg={stat.iconBg}
          cardBg={stat.cardBg}
        />
      ))}
    </div>
  );
};

export default VendorStats;
