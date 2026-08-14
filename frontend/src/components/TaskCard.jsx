import { useTasks } from "../context/taskContext.jsx"

const TaskCard = ({ task, setEditTask }) => {

    const { deleteTask } = useTasks()
    // const priorityStyles = {
    //     low: "bg-green-100 text-green-700",
    //     medium: "bg-yellow-100 text-yellow-700",
    //     high: "bg-red-100 text-red-700",
    // };

    // const statusStyles = {
    //     pending: "bg-gray-100 text-gray-700",
    //     "in-progress": "bg-blue-100 text-blue-700",
    //     completed: "bg-green-100 text-green-700",
    // };

    return (
        <div
            className={`grid grid-cols-[minmax(0,2fr)_minmax(120px,1fr)_minmax(100px,1fr)_minmax(120px,1fr)_minmax(110px,1fr)_minmax(150px,1.2fr)] items-center gap-4 px-4 border-b border-gray-100 py-4`}
        >
            {/* Task */}
            <div className="min-w-0">
                <h3 className="truncate font-medium text-gray-900">
                    {task.title}
                </h3>

                {task.description && (
                    <p className="mt-1 truncate text-sm text-gray-500">
                        {task.description}
                    </p>
                )}
            </div>

            {/* Category */}
            <div className="min-w-0">
                <span className="inline-block max-w-full truncate rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {task.category || "General"}
                </span>
            </div>

            {/* Priority */}
            <div>
                <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${task.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                >
                    {task.priority || "low"}
                </span>
            </div>

            {/* Due Date */}
            <div className="text-sm text-gray-600">
                {task.due_date ? task.due_date : "No due date"}
            </div>

            {/* Status */}
            <div>
                <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                        }`}
                >
                    {task.status || "Pending"}
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
                <button
                    type="button"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[#4800FF] transition hover:bg-purple-50"
                    onClick={() => setEditTask(task)}
                >
                    Edit
                </button>

                <button
                    type="button"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    onClick={() => deleteTask(task.task_id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskCard