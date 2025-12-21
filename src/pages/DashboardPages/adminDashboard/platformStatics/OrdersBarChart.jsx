import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OrdersBarChart = ({ pending, delivered }) => {
  const data = [
    { name: "Pending", value: pending },
    { name: "Delivered", value: delivered },
  ];

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h4 className="font-semibold mb-4">Orders Overview</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersBarChart;
