"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Charts = ({
  data: { salesData },
}: {
  data: { salesData: { month: string; totalSales: number }[] };
}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />

        <Tooltip
          cursor={{ fill: "transparent" }}
          contentStyle={{
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />

        <Bar
          dataKey="totalSales"
          fill="currentColor"
          className="fill-primary"
          radius={[4, 4, 0, 0]}
          // maxBarSize={60}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default Charts;
