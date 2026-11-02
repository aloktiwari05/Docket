import { useState } from "react";
import { Plus, CheckSquare, ListFilter, Loader2 } from "lucide-react";
import { useTasks } from '../context/taskContext.jsx';
import TaskCard from '../components/TaskCard.jsx';
import CreateTaskModal from "../components/CreateTaskModal.jsx";
import EditTaskModal from "../components/EditTaskModal.jsx";
import Pagination from "../components/Pagination.jsx";

function Tasks() {
  const { allTasks = [], editTask, setEditTask, isLoadingTasks } = useTasks();
  const [activeTab, setActiveTab] = useState("all");
  const [showTaskForm, setShowTaskForm] = useState(false);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const today = `${year}${month}${day}`;

  const safeTasks = Array.isArray(allTasks) ? allTasks : [];

  const allCount = safeTasks.length;
  const pendingCount = safeTasks.filter((task) => task.status === 'pending').length;
  const completedCount = safeTasks.filter((task) => task.status === 'completed').length;
  const overdueCount = safeTasks.filter((task) => {
    if (!task.due_date || task.status === 'completed') return false;
    return String(task.due_date).replaceAll('-', '') < today;
  }).length;

  const getFilteredTasks = () => {
    switch (activeTab) {
      case "all":
        return safeTasks;

      case "pending":
        return safeTasks.filter((task) => task.status === "pending");

      case "completed":
        return safeTasks.filter((task) => task.status === "completed");

      case "overdue":
        return safeTasks.filter((task) => {
          if (!task.due_date || task.status === "completed") return false;
          return String(task.due_date).replaceAll("-", "") < today;
        });

      default:
        return safeTasks;
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case "all":
        return "No tasks created yet! Click 'New Task' to get started.";
      case "pending":
        return "No pending tasks. You're completely up to date!";
      case "completed":
        return "No completed tasks yet. Finish a task and it will show up here!";
      case "overdue":
        return "No overdue tasks. Great job staying on schedule!";
      default:
        return "No tasks available.";
    }
  };

  const filteredTasks = getFilteredTasks();

  const tabs = [
    { id: "all", label: "All Tasks", count: allCount },
    { id: "pending", label: "Pending", count: pendingCount },
    { id: "completed", label: "Completed", count: completedCount },
    { id: "overdue", label: "Overdue", count: overdueCount },
  ];

  return (
    <div className="flex flex-1 min-h-screen w-full flex-col bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Tasks
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize, prioritize, and manage all your tasks
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowTaskForm(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4800FF] px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-[#4800FF]/25 transition hover:bg-[#3d00d6] active:scale-[0.99] w-full sm:w-auto"
        >
          <Plus size={18} />
          <span>New Task</span>
        </button>
      </section>

      {/* Filter Tabs */}
      <div className="mb-6 overflow-x-auto rounded-2xl border border-gray-200/80 bg-white p-1.5 shadow-xs">
        <div className="flex min-w-max items-center gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#4800FF] text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task List Table / Cards Container */}
      <section className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-xs">
        {/* Desktop Table Header */}
        <div className="hidden lg:grid grid-cols-[minmax(0,2.5fr)_minmax(90px,1fr)_minmax(85px,0.9fr)_minmax(110px,1.1fr)_minmax(95px,1fr)_minmax(120px,1.2fr)] items-center gap-3 border-b border-gray-200 bg-gray-50/80 px-5 py-3.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Task
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Category
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Priority
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Due Date
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Status
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">
            Actions
          </span>
        </div>

        {/* Content Body */}
        <div className="flex-1">
          {isLoadingTasks ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#4800FF]" />
              <p className="text-sm font-medium">Loading tasks...</p>
            </div>
          ) : safeTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-[#4800FF]">
                <CheckSquare size={32} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">
                No tasks yet
              </h2>
              <p className="mt-1.5 max-w-sm text-sm text-gray-500">
                Create your first task to start organizing and tracking your work.
              </p>
              <button
                type="button"
                onClick={() => setShowTaskForm(true)}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#4800FF] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3d00d6]"
              >
                <Plus size={16} />
                Create your first task
              </button>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center text-gray-500">
              <ListFilter size={28} className="text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">{getEmptyMessage()}</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.task_id}
                task={task}
                setEditTask={setEditTask}
              />
            ))
          )}
        </div>
      </section>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination />
      </div>

      {/* Create Task Modal */}
      {showTaskForm && (
        <CreateTaskModal setShowTaskForm={setShowTaskForm} />
      )}

      {/* Edit Task Modal */}
      {editTask && (
        <EditTaskModal
          editTask={editTask}
          setEditTask={setEditTask}
        />
      )}
    </div>
  );
}

export default Tasks;
