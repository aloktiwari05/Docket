import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { createTask } from '../services/service.tasks.js'

function Tasks() {
  const [activeTab, setActiveTab] = useState("all");
  const [showTaskForm, setShowTaskForm] = useState(false);

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value, }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTask(task)
    // Add API call here

    setTask({ title: "", description: "", priority: "Medium", dueDate: "", });
    setShowTaskForm(false);
  };

  const tabs = [
    { id: "all", label: "All", count: 12 },
    { id: "pending", label: "Pending", count: 5 },
    { id: "completed", label: "Completed", count: 6 },
    { id: "overdue", label: "Overdue", count: 1 },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 px-5 py-3">
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
      <section className="flex flex-1 flex-col rounded-2xl bg-white p-5 shadow-sm">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-0">
          <div className="flex flex-wrap items-end gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${activeTab === tab.id
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
        <div className="grid grid-cols-7 items-center rounded-lg bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-600">
          <div>Task</div>
          <div>Category</div>
          <div>Priority</div>
          <div>Due Date</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {/* Empty State */}
        <div className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-gray-200">

          <p className="text-gray-500">
            No tasks available. Click{" "}
            <span className="font-semibold text-[#4800FF]">
              "New Task"
            </span>{" "}
            to create one.
          </p>
        </div>

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

        {showTaskForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create New Task
                </h2>

                <button
                  onClick={() => setShowTaskForm(false)}
                  className="text-2xl text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 p-6">
                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter task title"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#4800FF] focus:ring-2 focus:ring-[#4800FF]/20"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Task description..."
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#4800FF] focus:ring-2 focus:ring-[#4800FF]/20"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={task.priority}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#4800FF] focus:ring-2 focus:ring-[#4800FF]/20"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Due Date */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Due Date
                    <span className="ml-1 text-gray-400">(Optional)</span>
                  </label>

                  <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#4800FF] focus:ring-2 focus:ring-[#4800FF]/20"
                  />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowTaskForm(false)}
                    className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="rounded-lg bg-[#4800FF] px-5 py-2 font-medium text-white transition hover:bg-[#3d00d6]"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Tasks;