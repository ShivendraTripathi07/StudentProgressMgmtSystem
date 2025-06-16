import {
  countUniqueSolvedProblems,
  filterByDateRange,
  getAverageRating,
  getMaxRatingProblem,
} from "../utils";

import React from "react";

import { TrendingUp, Award, Target, Clock, Star } from "lucide-react";

const ProblemStats = ({ submissions, timeFilter }) => {
  console.log(submissions.length, timeFilter);
  const filteredSubmissions = filterByDateRange(submissions, timeFilter);
  const maxRatingProblem = getMaxRatingProblem(filteredSubmissions);
  const uniqueSolved = countUniqueSolvedProblems(filteredSubmissions);
  const avgRating = getAverageRating(filteredSubmissions);
  const avgPerDay = (uniqueSolved / timeFilter).toFixed(1);

  const stats = [
    { label: "Problems Solved", value: uniqueSolved, icon: Target },
    {
      label: "Highest Rating",
      value: maxRatingProblem?.problem?.rating || "N/A",
      icon: TrendingUp,
    },
    { label: "Average Rating", value: avgRating || "N/A", icon: Award },
    { label: "Avg/Day", value: avgPerDay, icon: Clock },
    {
      label: "Most Difficult Problem",
      value: maxRatingProblem?.problem?.name || "N/A",
      subtitle: maxRatingProblem?.problem?.rating
        ? `Rating: ${maxRatingProblem.problem.rating}`
        : "",
      icon: Star,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <stat.icon className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">{stat.label}</span>
          </div>
          <div className="text-2xl font-bold truncate" title={stat.value}>
            {stat.value}
          </div>
          {stat.subtitle && (
            <div className="text-xs text-gray-500 mt-1">{stat.subtitle}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProblemStats;
