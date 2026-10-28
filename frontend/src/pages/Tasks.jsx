import { useState, } from "react";
import { Plus } from "lucide-react";
import { useTasks } from '../context/taskContext.jsx'
import TaskCard from '../components/TaskCard.jsx'
import CreateTaskModal from "../components/CreateTaskModal.jsx";
import EditTaskModal from "../components/EditTaskModal.jsx";
import Pagination from "../components/Pagination.jsx";

function Tasks() {
  const { allTasks, editTask, setEditTask } = useTasks()
  const [activeTab, setActiveTab] = useState("all");
  const [showTaskForm, setShowTaskForm] = useState(false);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, '0');
  const today = `${year}${month}${day}`;

  const allCount = allTasks?.length
  const pendingCount = allTasks?.filter((task) => task.status === 'pending').length
  const completedCount = allTasks?.filter((task) => task.status === 'completed').length
  const overdueCount = allTasks.filter((task) => { return task.due_date?.replaceAll('-', '') < today && task.status !== 'completed'; }).length

  const getFilteredTasks = () => {
    switch (activeTab) {
      case "all":
        return allTasks;

      case "pending":
        return allTasks.filter(
          (task) => task.status === "pending"
        );

      case "completed":
        return allTasks.filter(
          (task) => task.status === "completed"
        );

      case "overdue":
        return allTasks.filter(
          (task) =>
            task.due_date?.replaceAll("-", "") < today &&
            task.status !== "completed"
        );

      default:
        return [];
    }
  };

  const getEmptyMessage = () => {
    switch (activeTab) {
      case "all":
        return "No tasks yet !";

      case "pending":
        return "No pending tasks !";

      case "completed":
        return "Complete a task and it will appear here !";


      case "overdue":
        return "No overdue tasks !";

      default:
        return "No tasks available !";
    }
  };

  const renderTasks = () => {
    const tasks = getFilteredTasks();

    if (tasks.length === 0) {
      return (
        <div className="h-full w-full flex items-center justify-center text-gray-500 text-xl">
          <p>{getEmptyMessage()}</p>
        </div>
      );
    }

    return tasks.map((task) => (
      <TaskCard
        key={task.task_id}
        task={task}
        setEditTask={setEditTask}
      />
    ));
  };

  const tabs = [
    { id: "all", label: "All", count: allCount },
    { id: "pending", label: "Pending", count: pendingCount },
    { id: "completed", label: "Completed", count: completedCount },
    { id: "overdue", label: "Overdue", count: overdueCount },
  ];
    

return (
  <div className="flex min-h-screen w-full flex-col bg-gray-50 px-3 py-5 sm:px-5 lg:px-8">
    {/* Header */}
    <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Tasks
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          All your tasks in one place
        </p>
      </div>

      <button
        type="button"
        onClick={() => setShowTaskForm(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4800FF] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3d00d6] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:w-auto"
      >
        <Plus size={18} />
        New Task
      </button>
    </section>

    {/* Filters */}
    <div className="mb-5 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex min-w-max items-center gap-1 px-2 pt-2 sm:px-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            aria-pressed={activeTab === tab.id}
            className={`whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition sm:px-5 ${
              activeTab === tab.id
                ? "border-[#4800FF] bg-purple-50 text-[#4800FF]"
                : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs opacity-75">
              ({tab.count})
            </span>
          </button>
        ))}
      </div>
    </div>

    {/* Task list */}
    <section className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Desktop/tablet table header */}
      <div className="hidden grid-cols-[minmax(0,2fr)_minmax(85px,.85fr)_minmax(75px,.75fr)_minmax(95px,.95fr)_minmax(90px,.85fr)_minmax(115px,1.1fr)] items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-4 lg:grid lg:gap-3 lg:px-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Task
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Category
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Priority
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Due Date
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Status
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Actions
        </span>
      </div>

      {/* Content */}
      <div className="flex-1">
        {allTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50">
              <Plus size={26} className="text-[#4800FF]" />
            </div>

            <h2 className="text-base font-semibold text-gray-900">
              No tasks yet
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Create your first task to start organizing your work.
            </p>

            <button
              type="button"
              onClick={() => setShowTaskForm(true)}
              className="mt-5 rounded-lg bg-[#4800FF] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3d00d6]"
            >
              Create your first task
            </button>
          </div>
        ) : (
          renderTasks()
        )}
      </div>
    </section>

    {/* Pagination */}
    <div className="mt-5">
      <Pagination />
    </div>

    {/* Modals */}
    {showTaskForm && (
      <CreateTaskModal setShowTaskForm={setShowTaskForm} />
    )}

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