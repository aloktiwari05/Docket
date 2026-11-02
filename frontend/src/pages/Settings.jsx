import { useState } from "react";
import { useAuth } from "../context/authContext";
import { User, Mail, Bell, LogOut, CheckCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [bio, setBio] = useState("Software Engineer & TaskFlow enthusiast 🚀");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);

  const handleSavePreferences = (e) => {
    e.preventDefault();
    toast.success("Preferences saved successfully!");
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex-1 w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Account Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your personal profile, notification preferences, and account security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Profile Overview */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-[#4800FF]/10 text-[#4800FF] font-bold text-4xl flex items-center justify-center border-4 border-white shadow-md">
              {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-4">
            {user?.username || "TaskFlow User"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            {user?.email || "user@example.com"}
          </p>

          <span className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-[#4800FF]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Active Account
          </span>

          <div className="w-full mt-6 pt-6 border-t border-gray-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 font-semibold text-xs sm:text-sm hover:bg-rose-50 transition"
            >
              <LogOut className="w-4 h-4" />
              Sign Out of Account
            </button>
          </div>
        </div>

        {/* Right Cards: Account Info & Preferences */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 mb-5">
              <User className="w-5 h-5 text-[#4800FF]" />
              <h3 className="text-lg font-bold text-gray-900">
                Personal Information
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                  Username
                </label>
                <div className="rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-2.5 text-sm font-medium text-gray-800">
                  {user?.username || "Not set"}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-2.5 text-sm font-medium text-gray-800 flex items-center justify-between">
                  <span>{user?.email || "Not set"}</span>
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                  About / Bio
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10 text-gray-800"
                />
              </div>
            </div>
          </div>

          {/* Notifications & Preferences */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2.5 mb-5">
              <Bell className="w-5 h-5 text-[#4800FF]" />
              <h3 className="text-lg font-bold text-gray-900">
                Preferences
              </h3>
            </div>

            <form onSubmit={handleSavePreferences} className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Email Notifications</h4>
                  <p className="text-xs text-gray-500">Receive summary of daily tasks</p>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-[#4800FF] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Deadline Reminders</h4>
                  <p className="text-xs text-gray-500">Get alerts for overdue and upcoming tasks</p>
                </div>
                <input
                  type="checkbox"
                  checked={deadlineReminders}
                  onChange={(e) => setDeadlineReminders(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-[#4800FF] cursor-pointer"
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="rounded-xl bg-[#4800FF] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-[#4800FF]/25 hover:bg-[#3d00d6] transition"
                >
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
