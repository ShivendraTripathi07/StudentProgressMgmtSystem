import { TrendingUp } from "lucide-react";
import { filterByDateRange } from "../utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const RatingGraph = ({ contestData, timeFilter }) => {
  const filteredData = filterByDateRange(
    contestData,
    timeFilter,
    "ratingUpdateTimeSeconds"
  );

  const chartData = filteredData.map((contest) => ({
    date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
    rating: contest.newRating,
    change: contest.newRating - contest.oldRating,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Rating Progress
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default RatingGraph;
