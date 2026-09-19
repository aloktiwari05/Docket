import { useState, } from "react";
import { Plus } from "lucide-react";
import { useTasks } from '../context/taskContext.jsx'
import TaskCard from '../components/TaskCard.jsx'
import CreateTaskModal from "../components/CreateTaskModal.jsx";
import EditTaskModal from "../components/EditTaskModal.jsx";
import Pagination from "../components/Pagination.jsx";

function Tasks() {
  const { allTasks } = useTasks()
  const [activeTab, setActiveTab] = useState("all");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTask, setEditTask] = useState(null)

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
    <div className="flex min-h-screen w-full flex-col bg-gray-50 px-5 py-3">

      {/* <button className='border-xl bg-amber-300 w-md p-3' onClick={() => {fetchTasksService(accessToken)}}>Fetch Tasks</button> This  line is simply for testing purpose. */}
      {/* Header */}
      <section className="mb-5 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500">All your tasks in one place</p>
        </div>

        <button
          onClick={() => setShowTaskForm(true)}
          className="flex items-center gap-2 rounded-lg bg-[#4800FF] px-5 py-3 font-medium text-white shadow-md transition hover:bg-[#3d00d6]"
        >
          <Plus size={18} />
          New Task
        </button>
      </section>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-0">
        <div className="flex flex-wrap items-end gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-6 py-3 text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                ? "border-[#4800FF] bg-[#4800FF]/5 text-[#4800FF]"
                : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
                }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>
      {/* Table Header */}

      <div className={`grid grid-cols-[minmax(0,2fr)_minmax(120px,1fr)_minmax(100px,1fr)_minmax(120px,1fr)_minmax(110px,1fr)_minmax(150px,1.2fr)] items-center gap-4 px-4 border-b bg-white shadow-sm border-gray-200 rounded-t-2xl py-3`}>
        <div className="font-medium text-sm text-gray-600">
          Task
        </div>

        <div className="font-medium text-sm pl-1 text-gray-600">
          Category
        </div>

        <div className="font-medium text-sm pl-3 text-gray-600">
          Priority
        </div>

        <div className="font-medium text-sm pl-3 text-gray-600">
          Due Date
        </div>

        <div className="font-medium text-sm pl-3 text-gray-600">
          Status
        </div>

        <div className="font-medium text-sm pl-7 text-gray-600">
          Actions
        </div>
      </div>
      {/* Content */}

      <section className="flex flex-1 flex-col rounded-b-2xl bg-white p-5 shadow-sm overflow-y-auto">

        {/* Empty State */}
        {allTasks.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-gray-500">
              No tasks available. Click{" "}
              <span className="font-semibold text-[#4800FF]">
                "New Task"
              </span>{" "}
              to create one.
            </p>
          </div>
        ) : (

          renderTasks()
        )}


        {showTaskForm && (<CreateTaskModal setShowTaskForm={setShowTaskForm} />)}

        {editTask && (<EditTaskModal editTask={editTask} setEditTask={setEditTask} />)}

      </section>

      {/* Pagination */}
      <Pagination />
    </div>
  );
}

export default Tasks;