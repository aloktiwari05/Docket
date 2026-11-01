import { useTasks } from '../context/taskContext.jsx'

function EditTaskModal({ editTask, setEditTask }) {

  const taskID = editTask.task_id
  const { updateTask, taskDraft, setTaskDraft } = useTasks()

  // console.log("draft task: ", taskDraft)
  console.log('edit task: ', editTask.due_date)

  const compareChanges = () => {

    const changes = Object.keys(taskDraft).filter(i => taskDraft[i] !== editTask[i]).reduce((acc, i) => {
      acc[i] = editTask[i];
      return acc;
    }, {});

    return changes;
  };
  
  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditTask(prev => ({ ...prev, [name]: value }))
  };

  // Handle Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const changedFields = compareChanges()
    console.log(changedFields)
    await updateTask(taskID, changedFields);
    setTaskDraft({ title: "", description: "", priority: "medium", due_date: null, });
    setEditTask(null)
  };

  const handleCancelButton = () => {
    setTaskDraft({ title: "", description: "", priority: "medium", due_date: "", });
    setEditTask(null)
  }

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-6">
  <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

    {/* Header */}
    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Edit Task
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Update your task details below.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setEditTask(null)}
        aria-label="Close edit task modal"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
      >
        &times;
      </button>
    </div>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 sm:px-8">

      {/* Title */}
      <div>
        <label
          htmlFor="edit-title"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Title <span className="text-red-500">*</span>
        </label>

        <input
          id="edit-title"
          type="text"
          name="title"
          value={editTask.title}
          onChange={handleChange}
          required
          placeholder="Enter task title"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="edit-description"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Description
        </label>

        <textarea
          id="edit-description"
          rows={4}
          name="description"
          value={editTask.description}
          onChange={handleChange}
          placeholder="Add details about this task..."
          className="w-full resize-y rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm leading-6 text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10"
        />
      </div>

      {/* Priority and Due Date */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="edit-priority"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Priority
          </label>

          <select
            id="edit-priority"
            name="priority"
            value={editTask.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="edit-due-date"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Due Date
            <span className="ml-1 font-normal text-gray-400">
              (Optional)
            </span>
          </label>

          <input
            id="edit-due-date"
            type="date"
            name="due_date"
            value={editTask.due_date || ""}
            onChange={handleChange}
            className="w-full min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleCancelButton}
          className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-[#4800FF] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#3d00d6] focus:outline-none focus:ring-4 focus:ring-[#4800FF]/20"
        >
          Save Changes
        </button>
      </div>

    </form>
  </div>
</div>
)
}

export default EditTaskModal