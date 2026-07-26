import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

function Tasks() {
  const [activeTab, setActiveTab] = useState("all");

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

        <button className="flex items-center gap-2 rounded-lg bg-[#4800FF] px-5 py-3 font-medium text-white shadow-md transition hover:bg-[#3d00d6]">
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
      </section>
    </div>
  );
}

export default Tasks;