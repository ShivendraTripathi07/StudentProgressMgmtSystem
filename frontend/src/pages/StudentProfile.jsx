import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { User, Filter } from "lucide-react";
import RatingGraph from "../components/RatingGraph";
import ContestTable from "../components/ContestTable";
import ProblemStats from "../components/ProblemStats";
import RatingBucketChart from "../components/RatingBucketChart";
import HeatMapChart from "../components/HeatMapChart";

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [contestData, setContestData] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contestFilter, setContestFilter] = useState(365);
  const [problemFilter, setProblemFilter] = useState(90);
  const { studentId } = useParams();
  const API_BASE = "http://localhost:8000/student";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch student info
        const studentRes = await fetch(
          `${API_BASE}/particularStudent/${studentId}`
        );
        const studentData = await studentRes.json();
        setStudent(studentData.data);

        if (studentData.cfHandle) {
          // Fetch Codeforces data
          const [contestRes, submissionRes] = await Promise.all([
            fetch(
              `https://codeforces.com/api/user.rating?handle=${studentData.cfHandle}`
            ),
            fetch(
              `https://codeforces.com/api/user.status?handle=${studentData.cfHandle}`
            ),
          ]);

          const contestData = await contestRes.json();
          const submissionData = await submissionRes.json();

          setContestData(contestData.result || []);
          setSubmissions(submissionData.result || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Student not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {student.name || "Student Profile"}
              </h1>
              <p className="text-gray-600">
                Codeforces: {student.cfHandle || "Not provided"}
              </p>
              <p className="text-sm text-gray-500">Student ID: {studentId}</p>
            </div>
          </div>
        </div>

        {student.cfHandle ? (
          <>
            {/* Contest Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Contest Performance</h2>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <select
                    value={contestFilter}
                    onChange={(e) => setContestFilter(Number(e.target.value))}
                    className="border rounded px-3 py-1"
                  >
                    <option value={30}>Last 30 days</option>
                    <option value={90}>Last 90 days</option>
                    <option value={365}>Last 365 days</option>
                  </select>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <RatingGraph
                  contestData={contestData}
                  timeFilter={contestFilter}
                />
                <ContestTable
                  contestData={contestData}
                  timeFilter={contestFilter}
                />
              </div>
            </div>

            {/* Problem Solving Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Problem Solving Analytics
                </h2>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <select
                    value={problemFilter}
                    onChange={(e) => setProblemFilter(Number(e.target.value))}
                    className="border rounded px-3 py-1"
                  >
                    <option value={7}>Last 7 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={90}>Last 90 days</option>
                  </select>
                </div>
              </div>

              <ProblemStats
                submissions={submissions}
                timeFilter={problemFilter}
              />

              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                <RatingBucketChart
                  submissions={submissions}
                  timeFilter={problemFilter}
                />
                <HeatMapChart submissions={submissions} />
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600">
              No Codeforces handle provided for this student.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Add a Codeforces handle to view detailed analytics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
