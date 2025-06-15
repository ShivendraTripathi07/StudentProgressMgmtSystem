import React from "react";

import { Calendar } from "lucide-react";
import { getSubmissionHeatmapData } from "../utils";

const HeatMapChart = ({ submissions }) => {
  const heatmapData = getSubmissionHeatmapData(submissions);
  const weeks = [];

  // Group days into weeks for display
  const dates = Object.keys(heatmapData).sort();
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  const getIntensity = (count) => {
    if (count === 0) return "bg-gray-100";
    if (count <= 2) return "bg-green-200";
    if (count <= 5) return "bg-green-400";
    return "bg-green-600";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        Submission Activity
      </h3>
      <div className="overflow-x-auto">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: "repeat(53, 12px)" }}
        >
          {Object.entries(heatmapData).map(([date, count]) => (
            <div
              key={date}
              className={`w-3 h-3 rounded-sm ${getIntensity(count)}`}
              title={`${date}: ${count} submissions`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm" />
            <div className="w-3 h-3 bg-green-200 rounded-sm" />
            <div className="w-3 h-3 bg-green-400 rounded-sm" />
            <div className="w-3 h-3 bg-green-600 rounded-sm" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
export default HeatMapChart;
