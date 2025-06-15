import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { filterByDateRange, getRatingBuckets } from "../utils";

const RatingBucketChart = ({ submissions, timeFilter }) => {
  const filteredSubmissions = filterByDateRange(submissions, timeFilter);
  const buckets = getRatingBuckets(filteredSubmissions);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Problems by Rating</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={buckets}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingBucketChart;
