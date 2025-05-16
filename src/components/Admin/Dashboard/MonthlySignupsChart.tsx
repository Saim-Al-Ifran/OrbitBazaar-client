 
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface MonthlySignup {
  _id: number;
  count: number;
}

const months = [
  '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const MonthlySignupsChart = ({ data }: { data: MonthlySignup[] }) => {
  const chartData = data.map((item) => ({
    month: months[item._id],
    signups: item.count,
  }));

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Monthly Signups</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="signups" fill="#34D399" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySignupsChart;
