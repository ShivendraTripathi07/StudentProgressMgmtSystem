import { filterByDateRange } from "../utils";
import { Award } from "lucide-react";

const ContestTable = ({ contestData, timeFilter }) => {
  const filteredData = filterByDateRange(
    contestData,
    timeFilter,
    "ratingUpdateTimeSeconds"
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-96 flex flex-col">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 flex-shrink-0">
        <Award className="w-5 h-5" />
        Contest History
      </h3>
      <div className="overflow-x-auto flex-1 min-h-0">
        <div className="overflow-y-auto h-full">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b">
                <th className="text-left p-2">Contest</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Rank</th>
                <th className="text-left p-2">Rating Change</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((contest, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-2">{contest.contestName}</td>
                  <td className="p-2">
                    {new Date(
                      contest.ratingUpdateTimeSeconds * 1000
                    ).toLocaleDateString()}
                  </td>
                  <td className="p-2">{contest.rank}</td>
                  <td
                    className={`p-2 font-medium ${
                      contest.newRating - contest.oldRating >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {contest.newRating - contest.oldRating >= 0 ? "+" : ""}
                    {contest.newRating - contest.oldRating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContestTable;
