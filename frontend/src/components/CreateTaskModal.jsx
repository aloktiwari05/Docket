// import React from 'react'
import { useTasks } from '../context/taskContext.jsx'

const CreateTaskModal = ({ setShowTaskForm }) => {

    const { task, setTask, createTask } = useTasks()

    const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value, }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createTask()
    // Add API call here

    setTask({ title: "", description: "", priority: "medium", dueDate: "", });
    setShowTaskForm(false);
  };
  return (
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
  )
}

export default CreateTaskModal