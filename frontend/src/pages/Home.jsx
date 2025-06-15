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
  UserPlus,
  Mail,
  Phone,
  Trophy,
  TrendingUp,
  Calendar,
  Bell,
  Hash,
} from "lucide-react";
import { toast } from "react-toastify";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/getAllStudents`);
      const data = await response.json();
      console.log(data);
      setStudents(data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
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

  // Get particular student details
  // const getStudentDetails = async (studentId) => {
  //   try {
  //     const response = await fetch(
  //       `${API_BASE}/particularStudent/${studentId}`
  //     );
  //     const data = await response.json();
  //     setSelectedStudent(data.data);
  //     setShowDetailsModal(true);
  //   } catch (error) {
  //     console.error("Error fetching student details:", error);
  //   }
  // };

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
  //   {
  //     console.log(filteredStudents);
  //   }

  // Filter students based on search term
  const filteredStudents = Array.isArray(students)
    ? students.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.cfHandle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Student Management
            </h1>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={20} />
                Add Student
              </button>
              <button
                onClick={downloadCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Download size={20} />
                Download CSV
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search students by name, email, or CF handle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CF Handle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Rating
                  </th>
                  <th className=" mx-3 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {student.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {student.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">
                        {student.cfHandle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {student.currentRating}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {student.maxRating}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/getStudentDetail/${student._id}`)
                          }
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(student)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteStudent(student._id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
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
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No students found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Add New Student
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Codeforces Handle"
                value={formData.cfHandle}
                onChange={(e) =>
                  setFormData({ ...formData, cfHandle: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.autoEmailEnabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      autoEmailEnabled: e.target.checked,
                    })
                  }
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Enable Auto Email</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={addStudent}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Add Student
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Edit Student</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Codeforces Handle"
                value={formData.cfHandle}
                onChange={(e) =>
                  setFormData({ ...formData, cfHandle: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Current Rating"
                value={formData.currentRating}
                onChange={(e) =>
                  setFormData({ ...formData, currentRating: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Max Rating"
                value={formData.maxRating}
                onChange={(e) =>
                  setFormData({ ...formData, maxRating: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.autoEmailEnabled}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      autoEmailEnabled: e.target.checked,
                    })
                  }
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Enable Auto Email</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => updateStudent(selectedStudent._id)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Update Student
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Student Details
              </h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Personal Information
                </h3>

                <div className="flex items-center gap-3">
                  <UserPlus className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{selectedStudent.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{selectedStudent.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-purple-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedStudent.phone}</p>
                  </div>
                </div>
              </div>

              {/* Codeforces Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Codeforces Progress
                </h3>

                <div className="flex items-center gap-3">
                  <Hash className="text-indigo-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Handle</p>
                    <p className="font-medium font-mono">
                      {selectedStudent.cfHandle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Trophy className="text-yellow-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Current Rating</p>
                    <p className="font-bold text-lg text-blue-600">
                      {selectedStudent.currentRating}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <TrendingUp className="text-red-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Max Rating</p>
                    <p className="font-bold text-lg text-green-600">
                      {selectedStudent.maxRating}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="text-gray-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Last Synced</p>
                    <p className="font-medium">
                      {selectedStudent.lastSynced
                        ? new Date(
                            selectedStudent.lastSynced
                          ).toLocaleDateString()
                        : "Never"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Bell className="text-orange-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Auto Email</p>
                    <p className="font-medium">
                      {selectedStudent.autoEmailEnabled
                        ? "Enabled"
                        : "Disabled"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Progress */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
                Rating Progress
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Progress to Max Rating
                  </span>
                  <span className="text-sm font-medium">
                    {selectedStudent.currentRating} /{" "}
                    {selectedStudent.maxRating}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        (selectedStudent.currentRating /
                          selectedStudent.maxRating) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedStudent.currentRating === selectedStudent.maxRating
                    ? "At peak rating!"
                    : `${
                        selectedStudent.maxRating -
                        selectedStudent.currentRating
                      } points to reach max rating`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
