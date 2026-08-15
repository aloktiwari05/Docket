import { Search, Bell, Film, CircleCheck, Clock, CircleAlert, Star, } from "lucide-react";
import { useAuth } from "../context/authContext";
import { useTasks } from "../context/taskContext";
import { useState } from "react";

function Dashboard() {
  const { user } = useAuth();

  const { allTasks } = useTasks()

  const [now] = useState(() => Date.now())
  
    const allCount = allTasks?.length
    const pendingCount = allTasks?.filter((task) => !task.completed).length
    const completedCount = allTasks?.filter((task) => task.completed).length
    const overdueCount = allTasks.filter((task) => new Date(task.dueDate).getTime() < now && !task.completed).length

  return (
    <div className="w-full px-5 py-3 bg-gray-50 min-h-screen flex flex-col">

      <div className="flex items-center w-full min-h-16">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Hello, {user.username.toUpperCase()} 👋
          </h1>
          <p className="text-gray-500">
            Stay focused and get things done.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="relative w-100">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search tasks..." className="w-full pl-12 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4800FF]" />
          </div>

          <button className="p-2.5 rounded-full hover:bg-gray-200 transition">
            <Bell className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Rest of Dashboard */}

      <section className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Total Tasks */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {allCount ? allCount : 0}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#4800FF]/10">
                <Film className="h-5 w-5 text-[#4800FF]" />
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {completedCount ? completedCount : 0}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100">
                <CircleCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {pendingCount ? pendingCount : 0}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-100">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">
                  {overdueCount ? overdueCount : 0}
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-100">
                <CircleAlert className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 mb-1 flex-1 flex gap-6 min-h-0">

        <div className="w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Today's Tasks
            </h2>

            <button className="text-sm font-medium text-[#4800FF] hover:underline">
              View All
            </button>
          </div>

          {/* Task Item */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#4800FF] cursor-pointer"
              />

              <div>
                <h3 className="font-semibold text-gray-900">
                  Complete UI Dashboard
                </h3>
                <p className="text-sm text-gray-500">
                  Due Today
                </p>
              </div>
            </div>

            <button className="p-2 rounded-lg hover:bg-yellow-100 transition">
              <Star className="w-5 h-5 text-yellow-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Tasks by Category
            </h2>

            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4800FF]">
              <option>This Month</option>
              <option>This Week</option>
              <option>Today</option>
            </select>
          </div>

          <div className="h-72 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center">
            <p className="text-gray-400 font-medium">
              Graph Section
            </p>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Upcoming Deadlines
            </h2>

            <button className="text-sm font-medium text-[#4800FF] hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-4">

            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition">
              <div className="text-center bg-gray-100 h-15 w-15 rounded-lg">
                <p className="text-xs bg-purple-100 text-[#4800FF] rounded-t-xl">JUL</p>
                <p className="text-2xl font-bold text-gray-900">25</p>
              </div>

              <div className="flex-1 ml-4">
                <h3 className="font-semibold text-gray-900">
                  Team Meeting
                </h3>
                <p className="text-xs text-gray-500">In 3 Days</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                Medium
              </span>
            </div>

          </div>
          
        </div>
      </section>
    </div>
  );
}

export default Dashboard;