const TaskCard = ({ task }) => {
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
            key={task.id}
            className="grid grid-cols-7 items-center rounded-xl border border-gray-200 bg-white px-4 py-4 shadow-sm transition hover:shadow-md"
        >
            {/* Task */}
            <div className="min-w-0 pr-4">
                <h3 className="truncate font-semibold text-gray-900">
                    {task.title}
                </h3>

                {task.description && (
                    <p className="mt-1 truncate text-sm text-gray-500">
                        {task.description}
                    </p>
                )}
            </div>

            {/* Category */}
            <div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {task.category || "General"}
                </span>
            </div>

            {/* Priority */}
            <div>
                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${task.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                >
                    {task.priority}
                </span>
            </div>

            {/* Due Date */}
            <div className="text-sm text-gray-600">
                {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "No due date"}
            </div>

            {/* Status */}
            <div>
                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                        }`}
                >
                    {task.status || "Pending"}
                </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-[#4800FF] hover:bg-purple-50"
                    onClick={() => console.log("Edit task:", task.id)}
                >
                    Edit
                </button>

                <button
                    type="button"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                    onClick={() => console.log("Delete task:", task.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default TaskCard