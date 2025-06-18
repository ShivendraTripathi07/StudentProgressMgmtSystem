import React, { useState } from "react";
import { X, Save, Settings, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
const CronSettings = () => {
  const [cron, setCron] = useState("0 2 * * *");
  const [showCronModal, setShowCronModal] = useState(false);
  const API_BASE = "http://localhost:8000/student";
  const updateCron = async () => {
    try {
      await axios.post(`${API_BASE}/update-cron`, { schedule: cron });
      toast.success(`Cron updated to: ${cron}`);
      setShowCronModal(false);
    } catch (err) {
      console.error("Error updating cron:", err);
      toast.error("Failed to update cron");
    }
  };

  const cronPresets = [
    { label: "Every day at 2 AM", value: "0 2 * * *" },
    { label: "Every 6 hours", value: "0 */6 * * *" },
    { label: "Every Monday at 9 AM", value: "0 9 * * 1" },
    { label: "Every hour", value: "0 * * * *" },
  ];

  return (
    <>
      <button
        onClick={() => setShowCronModal(true)}
        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <Settings size={18} />
        Update Fetching
      </button>

      {showCronModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Calendar size={20} className="text-purple-600" />
                Schedule Settings
              </h2>
              <button
                onClick={() => setShowCronModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule Pattern
                </label>
                <input
                  type="text"
                  value={cron}
                  onChange={(e) => setCron(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                  placeholder="0 2 * * *"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: minute hour day month weekday
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quick Presets
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {cronPresets.map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => setCron(preset.value)}
                      className="text-left p-2 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                      <div className="font-medium text-sm text-gray-800">
                        {preset.label}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        {preset.value}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={updateCron}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Save size={16} />
                Update Schedule
              </button>
              <button
                onClick={() => setShowCronModal(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CronSettings;
