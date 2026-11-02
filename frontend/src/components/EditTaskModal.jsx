import { useState } from 'react';
import { useTasks } from '../context/taskContext.jsx';
import { X, Loader2, Calendar, Flag, AlignLeft, Type } from 'lucide-react';

function EditTaskModal({ editTask, setEditTask }) {
  const taskID = editTask.task_id;
  const { updateTask } = useTasks();
  const [formData, setFormData] = useState({
    title: editTask.title || "",
    description: editTask.description || "",
    priority: editTask.priority || "medium",
    due_date: editTask.due_date || "",
    status: editTask.status || "pending"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        due_date: formData.due_date || null
      };

      const success = await updateTask(taskID, payload);
      if (success) {
        setEditTask(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) setEditTask(null);
      }}
    >
      <div className="w-full max-w-xl max-h-[90vh] flex flex-col rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4.5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Edit Task
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Modify the details of your task
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEditTask(null)}
            disabled={isSubmitting}
            className="rounded-xl p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-gray-700">
              <Type className="w-3.5 h-3.5 text-gray-400" />
              <span>Title <span className="text-red-500">*</span></span>
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Task title"
              className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10 placeholder:text-gray-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-gray-700">
              <AlignLeft className="w-3.5 h-3.5 text-gray-400" />
              <span>Description</span>
            </label>

            <textarea
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add details about this task..."
              className="w-full resize-none rounded-xl border border-gray-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10 placeholder:text-gray-400"
            />
          </div>

          {/* Status, Priority, Due Date grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10 capitalize"
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-gray-700">
                <Flag className="w-3 h-3 text-gray-400" />
                <span>Priority</span>
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10 capitalize"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1 text-xs font-semibold text-gray-700">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span>Due Date</span>
              </label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date || ""}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setEditTask(null)}
              disabled={isSubmitting}
              className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-[#4800FF] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#4800FF]/25 hover:bg-[#3d00d6] transition active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
