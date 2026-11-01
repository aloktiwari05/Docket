import { Bell, Film, CircleCheck, Clock, CircleAlert, Star, CheckCircle2, Check, } from "lucide-react";
import { useAuth } from "../context/authContext";
import { useTasks } from "../context/taskContext";
import TaskSearch from "../components/TaskSearch";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const { user } = useAuth();
  const navigate = useNavigate();
  const { stats: { totalTasks, pendingTasks, completedTasks, overdueTasks, todaysTasks, upcomingTasks }, toggleStatus } = useTasks()

  return (
    <div className="w-full px-5 py-3 bg-gray-50 min-h-screen flex flex-col overflow-y-hidden">

      <div className="flex items-center w-full min-h-16">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Hello, {user.username.toUpperCase()} 👋
          </h1>
          <p className="text-gray-500">
            Stay focused and get things done.
          </p>
        </div>

        <div className="ml-auto flex  items-center gap-4">
          {/* <div className="relative w-100">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" onChange={handleSearch} placeholder="Search tasks..." className="w-full pl-12 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4800FF]" />
          </div> */}

          <TaskSearch />

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
                  {totalTasks}
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
                  {completedTasks}
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
                  {pendingTasks}
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
                  {overdueTasks}
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

        <div className="min-w-1/2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Today's Tasks
            </h2>
          </div>

          {/* Task Item */}
          {todaysTasks && todaysTasks.length > 0 ? (
            todaysTasks.map((task) => (

              <div
                key={task.task_id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${task.status === "completed"
                  ? "bg-green-50/70 border-green-200 hover:bg-green-50"
                  : "bg-white border-gray-100 hover:bg-gray-50"
                  }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <input
                    type="checkbox"
                    checked={task.status === "completed"}
                    onChange={() => toggleStatus(task)}
                    aria-label={`Mark ${task.title} as ${task.status === "completed" ? "pending" : "completed"
                      }`}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded accent-green-600"
                  />

                  <div
                    onClick={() => navigate(`/task/${task.task_id}`)}
                    className="min-w-0 cursor-pointer"
                  >
                    <div
                      className={`font-semibold transition-colors ${task.status === "completed"
                        ? "text-gray-400 line-through"
                        : "text-gray-900"
                        }`}
                    >
                      {task.title}
                    </div>

                    <div
                      className={`text-sm mt-1 ${task.status === "completed"
                        ? "text-green-600"
                        : "text-gray-500"
                        }`}
                    >
                      {task.status === "completed"
                        ? "Completed"
                        : `Due : ${task.due_date}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {task.status === "completed" && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Done
                    </span>
                  )}

                  <button className="p-2 rounded-lg hover:bg-yellow-100 transition">
                    <Star className="w-5 h-5 text-yellow-500" />
                  </button>
                </div>
              </div>

            ))
          ) : (
            <p className="w-full h-full flex items-center justify-center text-center text-gray-500 py-6">
              No task available
            </p>
          )}
        </div>

        {/* Optional : might look to implement in future if needed */}
        {/* <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
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
        </div> */}

        {/* Upcoming Deadlines */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Upcoming Deadlines
            </h2>

          </div>

          {upcomingTasks && upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <div key={task.task_id} className="space-y-4" onClick={()=>navigate(`/task/${task.task_id}`)}>
                <div
                  className={`flex items-center justify-between p-4 rounded-xl border transition ${task.status === "completed"
                      ? "border-green-200 bg-green-50/50"
                      : "border-gray-100 hover:bg-gray-50"
                    }`}
                >
                  {/* Date */}
                  <div
                    className={`text-center h-15 w-15 rounded-lg ${task.status === "completed"
                        ? "bg-green-100"
                        : "bg-gray-100"
                      }`}
                  >
                    <p
                      className={`text-xs rounded-t-xl ${task.status === "completed"
                          ? "bg-green-200 text-green-700"
                          : "bg-purple-100 text-[#4800FF]"
                        }`}
                    >
                      {task.month}
                    </p>

                    <p className="text-2xl font-bold text-gray-900">
                      {task.day}
                    </p>
                  </div>

                  {/* Task Details */}
                  <div className="flex-1 ml-4">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`font-semibold ${task.status === "completed"
                            ? "text-gray-500 line-through"
                            : "text-gray-900"
                          }`}
                      >
                        {task.title}
                      </h3>

                      {task.status === "completed" && (
                        <CheckCircle2
                          size={16}
                          className="text-green-600 shrink-0"
                        />
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      {task.status === "pending" &&`Due in ${task.days_until_due} Days`}
                    </p>
                  </div>

                  {/* Status / Priority */}
                  {task.status === "completed" ? (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">
                      <Check size={12} />
                      Completed
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                      {task.priority}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="flex items-center justify-center h-full w-full text-center text-gray-500 py-6">
              No upcoming tasks available
            </p>
          )}
        </div>

      </section>
    </div>
  );
}

export default Dashboard;