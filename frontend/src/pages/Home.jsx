import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Download,
  Eye,
  Search,
  X,
  Save,
  Clock,
  Mail,
  Send,
} from "lucide-react";
import { toast } from "react-toastify";
import CronSettings from "../components/CronScheduling";
import axios from "axios";
const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cfHandle: "",
    currentRating: "",
    maxRating: "",
    autoEmailEnabled: false,
  });

  // API Base URL - adjust this to match your backend
  const API_BASE = "http://localhost:8000/student"; // Change this to your actual API base URL

  // Fetch all students

  const sendForInactivity = async () => {
    const response = await fetch(`${API_BASE}/test-fetch`);
    console.log(response);
    if (response) {
      toast.success("Email for inactivity send successfully");
    } else {
      toast.error("Error");
    }
    // console.log(response);
  };
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/getAllStudents`);
      const data = await response.json();
      // console.log(data);
      setStudents(data.data);
    } catch (error) {
      toast.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add new student
  const addStudent = async () => {
    try {
      const response = await fetch(`${API_BASE}/postStudentDetail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          currentRating: parseInt(formData.currentRating) || 0,
          maxRating: parseInt(formData.maxRating) || 0,
          lastSynced: new Date(),
          reminderCount: 0,
        }),
      });
      if (response.ok) {
        toast.success("User created Successfully");
        fetchStudents();
        setShowAddModal(false);
        resetForm();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Update student
  const updateStudent = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/updateStudent/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          currentRating: parseInt(formData.currentRating) || 0,
          maxRating: parseInt(formData.maxRating) || 0,
        }),
      });
      if (response.ok) {
        toast.success("user updated Successfully");
        fetchStudents();
        setShowEditModal(false);
        resetForm();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(`${API_BASE}/deleteStudent/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("user deleted Successfully");
          fetchStudents();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  // Download CSV
  const downloadCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "CF Handle",
      "Current Rating",
      "Max Rating",
    ];
    const csvContent = [
      headers.join(","),
      ...students.map((student) =>
        [
          student.name,
          student.email,
          student.phone,
          student.cfHandle,
          student.currentRating,
          student.maxRating,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      cfHandle: "",
      currentRating: "",
      maxRating: "",
      autoEmailEnabled: false,
    });
  };

  // Open edit modal
  const openEditModal = (student) => {
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      cfHandle: student.cfHandle,
      currentRating: student.currentRating,
      maxRating: student.maxRating,
      autoEmailEnabled: student.autoEmailEnabled,
    });
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  // Filter students based on search term
  const filteredStudents = Array.isArray(students)
    ? students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.cfHandle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Last SYnced
  const getLastSync = async () => {
    const res = await fetch(`${API_BASE}/last-sync`);

    setLastSynced(new Date(res.data?.lastSynced));
    console.log(lastSynced);
  };
  useEffect(() => {
    fetchStudents();
    getLastSync();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Cron Settings */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
              Student Management System
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-blue-500" />
              <span>
                Last updated:{" "}
                {lastSynced ? lastSynced.toLocaleString() : "Loading..."}
              </span>
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div>
              <CronSettings />
            </div>

            <button
              onClick={sendForInactivity}
              className="cursor-pointer group relative inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 border border-transparent hover:border-white/20"
            >
              <Mail
                size={16}
                className="transition-transform duration-200 group-hover:scale-110"
              />
              <span>Send Inactivity Alerts</span>
              <Send
                size={14}
                className="opacity-70 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus size={20} />
                Add Student
              </button>
              <button
                onClick={downloadCSV}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Download size={20} />
                Export CSV
              </button>
            </div>

            {/* Enhanced Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search students by name, email, or CF handle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Enhanced Students Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    CF Handle
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Current Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Max Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/50 divide-y divide-gray-100">
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student._id}
                    className="hover:bg-white/80 transition-all duration-200 group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {student.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {student.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {student.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-1 rounded">
                        {student.cfHandle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200">
                        {student.currentRating}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                        {student.maxRating}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => {
                            navigate(`/getStudentDetail/${student._id}`);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(student)}
                          className="text-indigo-600 hover:text-indigo-800 p-2 rounded-lg hover:bg-indigo-50 transition-all duration-200"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteStudent(student._id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredStudents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-2">
                <Search size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg font-medium">
                No students found
              </p>
              <p className="text-gray-400 text-sm">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 transform transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Plus size={20} className="text-blue-600" />
                Add New Student
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <input
                type="text"
                placeholder="Codeforces Handle"
                value={formData.cfHandle}
                onChange={(e) =>
                  setFormData({ ...formData, cfHandle: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono transition-all duration-200"
              />
              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-200">
                <input
                  type="checkbox"
                  checked={formData.autoEmailEnabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      autoEmailEnabled: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable Auto Email Notifications
                </span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={addStudent}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Save size={16} />
                Add Student
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Edit Student Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl border border-gray-100 transform transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Edit size={20} className="text-indigo-600" />
                Edit Student
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              <input
                type="text"
                placeholder="Codeforces Handle"
                value={formData.cfHandle}
                onChange={(e) =>
                  setFormData({ ...formData, cfHandle: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono transition-all duration-200"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Current Rating"
                  value={formData.currentRating}
                  onChange={(e) =>
                    setFormData({ ...formData, currentRating: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
                <input
                  type="number"
                  placeholder="Max Rating"
                  value={formData.maxRating}
                  onChange={(e) =>
                    setFormData({ ...formData, maxRating: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-200">
                <input
                  type="checkbox"
                  checked={formData.autoEmailEnabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      autoEmailEnabled: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Enable Auto Email Notifications
                </span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => updateStudent(selectedStudent._id)}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Save size={16} />
                Update Student
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
