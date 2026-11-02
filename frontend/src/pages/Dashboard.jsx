import { CheckCircle2, Clock, CircleAlert, Check, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { useAuth } from "../context/authContext";
import { useTasks } from "../context/taskContext";
import TaskSearch from "../components/TaskSearch";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    stats: {
      totalTasks = 0,
      pendingTasks = 0,
      completedTasks = 0,
      overdueTasks = 0,
      todaysTasks = [],
      upcomingTasks = []
    },
    toggleStatus
  } = useTasks();

  const username = user?.username ? user.username.toUpperCase() : "DEVELOPER";

  return (
    <div className="w-full flex-1 bg-gray-50 p-4 sm:p-6 lg:p-8 flex flex-col overflow-x-hidden">
      {/* Top Bar Greeting & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Hello, {username} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Stay organized, focused, and get things done.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <TaskSearch />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <section className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Total Tasks */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Tasks</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {totalTasks}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4800FF]/10 text-[#4800FF]">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Completed</p>
                <h2 className="mt-2 text-3xl font-bold text-emerald-600">
                  {completedTasks}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pending</p>
                <h2 className="mt-2 text-3xl font-bold text-amber-600">
                  {pendingTasks}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Overdue</p>
                <h2 className="mt-2 text-3xl font-bold text-rose-600">
                  {overdueTasks}
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <CircleAlert className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Columns: Today's Tasks & Upcoming Deadlines */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#4800FF]" />
              <h2 className="text-lg font-bold text-gray-900">
                Today&apos;s Tasks
              </h2>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-purple-50 text-[#4800FF]">
              {todaysTasks?.length || 0} tasks
            </span>
          </div>

          <div className="flex-1 space-y-3">
            {todaysTasks && todaysTasks.length > 0 ? (
              todaysTasks.map((task) => (
                <div
                  key={task.task_id}
                  className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-200 ${
                    task.status === "completed"
                      ? "bg-emerald-50/50 border-emerald-100 text-gray-400"
                      : "bg-white border-gray-100 hover:border-purple-200 hover:shadow-xs text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <input
                      type="checkbox"
                      checked={task.status === "completed"}
                      onChange={() => toggleStatus(task)}
                      aria-label={`Mark ${task.title} as ${
                        task.status === "completed" ? "pending" : "completed"
                      }`}
                      className="h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-[#4800FF]"
                    />

                    <div
                      onClick={() => navigate(`/task/${task.task_id}`)}
                      className="min-w-0 cursor-pointer flex-1"
                    >
                      <h3
                        className={`text-sm font-semibold truncate ${
                          task.status === "completed"
                            ? "text-gray-400 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </h3>

                      <p
                        className={`text-xs mt-0.5 truncate ${
                          task.status === "completed"
                            ? "text-emerald-600"
                            : "text-gray-500"
                        }`}
                      >
                        {task.status === "completed"
                          ? "Completed"
                          : `Due: Today`}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pl-2">
                    {task.status === "completed" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                        <Check className="w-3 h-3" />
                        Done
                      </span>
                    ) : (
                      <span
                        className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                          task.priority === "high"
                            ? "bg-rose-50 text-rose-600"
                            : task.priority === "medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {task.priority || "Normal"}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-50 text-[#4800FF] flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-700">No tasks due today</p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  You are all caught up for today! Enjoy your day or plan ahead.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/tasks')}
                  className="mt-4 text-xs font-semibold text-[#4800FF] hover:underline"
                >
                  View all tasks &rarr;
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 sm:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#4800FF]" />
              <h2 className="text-lg font-bold text-gray-900">
                Upcoming Deadlines
              </h2>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
              {upcomingTasks?.length || 0} upcoming
            </span>
          </div>

          <div className="flex-1 space-y-3">
            {upcomingTasks && upcomingTasks.length > 0 ? (
              upcomingTasks.map((task) => (
                <div
                  key={task.task_id}
                  onClick={() => navigate(`/task/${task.task_id}`)}
                  className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all ${
                    task.status === "completed"
                      ? "border-emerald-100 bg-emerald-50/40 opacity-75"
                      : "border-gray-100 bg-white hover:border-purple-200 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    {/* Calendar Badge */}
                    <div
                      className={`text-center h-12 w-12 rounded-xl flex flex-col justify-center shrink-0 border ${
                        task.status === "completed"
                          ? "bg-emerald-50 border-emerald-200"
                          : "bg-purple-50/60 border-purple-100"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase text-[#4800FF]">
                        {task.month || "TASK"}
                      </span>
                      <span className="text-base font-extrabold text-gray-900 leading-none">
                        {task.day || "•"}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3
                        className={`text-sm font-semibold truncate ${
                          task.status === "completed"
                            ? "text-gray-400 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {task.status === "completed"
                          ? "Completed"
                          : task.days_until_due !== undefined
                          ? `Due in ${task.days_until_due} ${
                              task.days_until_due === 1 ? "day" : "days"
                            }`
                          : "Upcoming"}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 pl-2">
                    {task.status === "completed" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <Check className="w-3 h-3" />
                        Done
                      </span>
                    ) : (
                      <span
                        className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                          task.priority === "high"
                            ? "bg-rose-50 text-rose-600"
                            : task.priority === "medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {task.priority || "Normal"}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-700">No upcoming deadlines</p>
                <p className="text-xs text-gray-400 mt-1 max-w-xs">
                  Create new tasks with due dates to see them scheduled here.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/tasks')}
                  className="mt-4 text-xs font-semibold text-[#4800FF] hover:underline"
                >
                  Manage tasks &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
