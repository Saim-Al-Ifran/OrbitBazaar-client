
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface MonthlyRevenue {
  _id: number;
  total: number;
}

const months = [
  '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
 

const MonthlyRevenueChart = ({ data }: { data: MonthlyRevenue[] }) => {
  const chartData = data.map((item) => ({
    month: months[item._id],
    revenue: item.total,
  }));

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#60A5FA" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueChart;
