import { useState, } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useTasks } from '../context/taskContext.jsx'
import TaskCard from '../components/TaskCard.jsx'
import CreateTaskModal from "../components/createTaskModal.jsx";
import EditTaskModal from "../components/EditTaskModal.jsx"

function Tasks() {
  const { allTasks } = useTasks()
  const [activeTab, setActiveTab] = useState("all");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editTask, setEditTask] = useState(null)

  console.log(editTask)

  const [now] = useState(() => Date.now())

  const allCount = allTasks?.length
  const pendingCount = allTasks?.filter((task) => !task.completed).length
  const completedCount = allTasks?.filter((task) => task.completed).length
  const overdueCount = allTasks.filter((task) => new Date(task.dueDate).getTime() < now && !task.completed).length

  // console.log(allTasks)

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

      {/* Content */}
      <section className="flex flex-1 flex-col rounded-2xl bg-white p-5 shadow-sm overflow-y-auto">
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

          <select className="mb-3 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#4800FF] focus:ring-2 focus:ring-[#4800FF]/20">
            <option>Filter by Category</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>
        </div>

        {/* Table Header */}

        <div className={`grid grid-cols-[minmax(0,2fr)_minmax(120px,1fr)_minmax(100px,1fr)_minmax(120px,1fr)_minmax(110px,1fr)_minmax(150px,1.2fr)] items-center gap-4 px-4 border-b border-gray-200 bg-gray-50 py-3`}>
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
          allTasks.map((task) => (
            <TaskCard key={task.task_id} task={task} setEditTask={setEditTask} />
          ))
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">1-10</span> of{" "}
            <span className="font-medium">24</span> tasks
          </p>

          <div className="flex items-center gap-2">
            {/* Previous */}
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition hover:bg-gray-100 hover:shadow">
              <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4800FF] text-sm font-medium text-white shadow-md">
              1
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 hover:shadow">
              2
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 hover:shadow">
              3
            </button>

            {/* Next */}
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition hover:bg-gray-100 hover:shadow">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {showTaskForm && (<CreateTaskModal setShowTaskForm={setShowTaskForm} />)}

        {editTask && ( <EditTaskModal editTask={editTask} setEditTask={setEditTask} />)}


      </section>
    </div>
  );
}

export default Tasks;