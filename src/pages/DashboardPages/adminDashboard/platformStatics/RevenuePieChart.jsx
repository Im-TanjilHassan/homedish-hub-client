import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from "recharts";

const RevenuePieChart = ({ amount }) => {
  const data = [{ name: "Total Revenue", value: amount }];

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h4 className="font-semibold mb-4">Revenue Snapshot</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenuePieChart;
