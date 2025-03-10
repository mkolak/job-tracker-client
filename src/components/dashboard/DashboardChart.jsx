import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { StatsService } from "../../services/StatsService";

const calculateBarchartWidth = (numberOfItem = 6) => {
  if (numberOfItem > 6) return numberOfItem * 130;
  return "100%";
};

function DashboardChart() {
  const statsService = new StatsService();

  const { data } = useQuery({
    queryKey: ["monthly"],
    queryFn: () => statsService.getMonthlyCount(),
  });

  let monthlyData = data?.stats || [];

  if (!monthlyData.length) return null;

  monthlyData = monthlyData.map((entry) => ({
    month: `${entry.month}/${entry.year}`,
    Pending: entry.pending,
    Interview: entry.interview,
    Rejected: entry.rejected,
  }));

  return (
    <div className="overflow-x-auto">
      <ResponsiveContainer
        width={calculateBarchartWidth(monthlyData.length)}
        height={400}
      >
        <BarChart data={monthlyData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip wrapperClassName="rounded-lg shadow-lg" />
          <Bar
            dataKey="Pending"
            fill="rgb(250, 204, 21)"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="Interview"
            fill="rgb(74, 222, 128)"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="Rejected"
            fill="rgb(248, 113, 113)"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;
