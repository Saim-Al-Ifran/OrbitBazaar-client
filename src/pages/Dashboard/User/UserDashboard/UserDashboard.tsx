 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetUserDashboardDataQuery } from "../../../../features/dashboard/dashboardApi";
import { FadeLoader } from "react-spinners";
import { useGetUserProfileQuery } from "../../../../features/user/userApi";

const UserDashboard = () => {
  const { data, isLoading, isError } = useGetUserDashboardDataQuery();
  const {data:userData} = useGetUserProfileQuery();
  console.log();
  if (isLoading) {
    return (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <FadeLoader />
        </div>
    );
  };
  if (isError || !data) return <p>Failed to load dashboard data.</p>;

  const stats = {
    totalOrders: data.totalOrders,
    totalPurchases: data.totalOrders - data.pendingOrders,
    pendingOrders: data.pendingOrders,
    totalSpent: data.totalSpent,
  };

const now = new Date();
const months = Array.from({ length: 6 }, (_, i) => {
  const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
  const key = `${date.getMonth() + 1}-${date.getFullYear()}`; // e.g. "7-2025"
  const label = date.toLocaleString("en-US", { month: "short" }); // e.g. "Jul"
  return { key, label };
});

// Create a lookup from your actual data
const dataMap = new Map(
  data.chartData.map((entry) => [entry.month, entry.total])
);

// Merge baseline with actual data
const chartData = months.map(({ key, label }) => ({
  month: label,
  spent: dataMap.get(key) ?? 0, // Fill missing months with 0
}));

const recentOrders = data.recentOrders.map((order) => ({
    id: order._id,
    product: order.items[0]?.productID.name,
    status: order.status,
    date: new Date(order.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    images: order.items[0]?.productID.images,
}));
 
  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
     <h1 className="text-2xl font-bold flex items-center gap-2">
      Hello, {userData?.data?.name}
      <i className="fas fa-rocket text-[#e29a3b]"></i>
    </h1>

      <p className="text-gray-500">Here’s an overview of your activity</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-base-100 p-4 rounded-xl shadow-md flex items-center space-x-4">
          <i className="fas fa-box-open text-3xl text-blue-500"></i>
          <div>
            <h2 className="text-lg font-bold">Total Orders</h2>
            <p className="text-2xl">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="bg-base-100 p-4 rounded-xl shadow-md flex items-center space-x-4">
          <i className="fas fa-shopping-cart text-3xl text-green-500"></i>
          <div>
            <h2 className="text-lg font-bold">Purchases</h2>
            <p className="text-2xl">{stats.totalPurchases}</p>
          </div>
        </div>

        <div className="bg-base-100 p-4 rounded-xl shadow-md flex items-center space-x-4">
          <i className="fas fa-clock text-3xl text-yellow-700"></i>
          <div>
            <h2 className="text-lg font-bold">Pending Orders</h2>
            <p className="text-2xl">{stats.pendingOrders}</p>
          </div>
        </div>

        <div className="bg-base-100 p-4 rounded-xl shadow-md flex items-center space-x-4">
          <i className="fas fa-dollar-sign text-3xl text-purple-500"></i>
          <div>
            <h2 className="text-lg font-bold">Total Spent</h2>
            <p className="text-2xl">${stats.totalSpent}</p>
          </div>
        </div>
      </div>

      {/* Chart + Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spending Chart */}
        <div className="bg-base-100 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-bold mb-4">Spending Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="spent" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-base-100 p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-bold mb-4">Recent Orders</h2>
          <ul className="space-y-3">
            {recentOrders.map((order) => (
              <li
                key={order.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={order.images?.[0]}
                    alt={order.product}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-semibold">{order.product}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
        {/* Status Badge */}
        <span
          className={`badge ${
            order.status === "confirmed"
              ? "badge-info"
              : order.status === "processing"
              ? "badge-warning"
              : order.status === "delivered"
              ? "badge-success"
              : order.status === "cancelled"
              ? "badge-error"
              : ""
          }`}
        >
          {order.status}
        </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
