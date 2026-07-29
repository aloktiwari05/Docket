import React from "react";
import {
  UserCircle,
  Camera,
  Pencil,
  Lock,
  Trash2,
} from "lucide-react";

function Settings() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="grid grid-cols-1 lg:grid-cols-3">

          {/* LEFT COLUMN */}
          <div className="bg-[#4800FF] text-white flex flex-col items-center justify-center p-10">

            <div className="relative">
              <UserCircle className="w-44 h-44" />

              <button className="absolute bottom-2 right-2 bg-white text-[#4800FF] p-3 rounded-full shadow-lg hover:scale-110 transition">
                <Camera size={18} />
              </button>
            </div>

            <h2 className="text-3xl font-bold mt-6">John Doe</h2>

            <p className="text-white/80 mt-2">
              johndoe@gmail.com
            </p>

            <button className="mt-8 bg-white text-[#4800FF] font-semibold px-6 py-3 rounded-xl hover:bg-gray-200 transition">
              Change Photo
            </button>

          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 p-10">

            <h1 className="text-4xl font-bold text-[#4800FF] mb-8">
              Account Settings
            </h1>

            <div className="space-y-6">

              {/* Username */}
              <div className="border rounded-xl p-5">
                <label className="text-gray-500 text-sm">
                  Username
                </label>

                <p className="text-xl font-semibold">
                  johndoe
                </p>
              </div>

              {/* Email */}
              <div className="border rounded-xl p-5">
                <label className="text-gray-500 text-sm">
                  Email
                </label>

                <p className="text-xl font-semibold">
                  johndoe@gmail.com
                </p>
              </div>

              {/* Bio */}
              <div className="border rounded-xl p-5">
                <label className="text-gray-500 text-sm">
                  Bio
                </label>

                <p className="text-gray-700">
                  Frontend Developer | React Enthusiast | Coffee Lover ☕
                </p>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-10">

              <button className="flex items-center gap-2 bg-[#4800FF] text-white px-6 py-3 rounded-xl hover:bg-[#3600cc] transition">
                <Pencil size={18} />
                Edit Profile
              </button>

              <button className="flex items-center gap-2 border border-[#4800FF] text-[#4800FF] px-6 py-3 rounded-xl hover:bg-[#4800FF] hover:text-white transition">
                <Lock size={18} />
                Change Password
              </button>

              <button className="flex items-center gap-2 border border-red-500 text-red-500 px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition">
                <Trash2 size={18} />
                Delete Account
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;