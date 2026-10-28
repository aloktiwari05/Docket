import { useNavigate } from "react-router-dom"
import { useTasks } from "../context/taskContext.jsx"

const TaskCard = ({ task, setEditTask }) => {

    const id = task.task_id

    const { deleteTask, setTaskDraft, updateTask } = useTasks()
    const navigate = useNavigate()
    const handleEditButton = () => {
        setEditTask(task)
        setTaskDraft(task)
    }

    const handleStatusToggle = async () => {

        const newStatus = task.status === "completed" ? {status : "pending"} : {status : "completed"}
        console.log(newStatus)
        await updateTask(id, newStatus);
    }

    return (
        <>
            {/* Desktop table row */}
            <div
                className={`hidden grid-cols-[minmax(0,2fr)_minmax(85px,.85fr)_minmax(75px,.75fr)_minmax(95px,.95fr)_minmax(90px,.85fr)_minmax(115px,1.1fr)] items-center gap-2 border-b border-gray-100 px-4 py-4 transition hover:bg-gray-50 lg:grid lg:gap-3 lg:px-5 ${task.status === "completed" ? "bg-gray-50/70" : ""
                    }`}
            >
                {/* Task and checkbox */}
                <div className="flex min-w-0 items-start gap-3">
                    <input
                        type="checkbox"
                        checked={task.status === "completed"}
                        onChange={handleStatusToggle}
                        aria-label={`Mark ${task.title} as ${task.status === "completed" ? "pending" : "completed"
                            }`}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-[#4800FF]"
                    />

                    <button
                        type="button"
                        onClick={() => navigate(`/task/${id}`)}
                        className="min-w-0 flex-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    >
                        <h3
                            className={`truncate text-sm font-semibold ${task.status === "completed"
                                ? "text-gray-400 line-through"
                                : "text-gray-900"
                                }`}
                        >
                            {task.title}
                        </h3>

                        {task.description && (
                            <p className="mt-1 truncate text-xs text-gray-500">
                                {task.description}
                            </p>
                        )}
                    </button>
                </div>

                {/* Category */}
                <div className="min-w-0">
                    <span className="inline-block max-w-full truncate rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        {task.category || "General"}
                    </span>
                </div>

                {/* Priority */}
                <div>
                    <span
                        className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize ${task.priority === "high"
                            ? "bg-red-50 text-red-700"
                            : task.priority === "medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-green-50 text-green-700"
                            }`}
                    >
                        {task.priority || "low"}
                    </span>
                </div>

                {/* Due date */}
                <div className="min-w-0 text-xs text-gray-600">
                    <span className="block truncate">
                        {task.due_date || "No due date"}
                    </span>
                </div>

                {/* Status */}
                <div>
                    <span
                        className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize ${task.status === "completed"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {task.status || "pending"}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-1">
                    <button
                        type="button"
                        onClick={handleEditButton}
                        className="rounded-lg px-2.5 py-2 text-xs font-semibold text-[#4800FF] transition hover:bg-purple-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => deleteTask(task.task_id)}
                        className="rounded-lg px-2.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Mobile and tablet task card */}
            <article
                className={`border-b border-gray-100 p-4 transition last:border-b-0 hover:bg-gray-50 lg:hidden sm:p-5 ${task.status === "completed" ? "bg-gray-50/70" : ""
                    }`}
            >
                {/* Title, checkbox and priority */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                        <input
                            type="checkbox"
                            checked={task.status === "completed"}
                            onChange={handleStatusToggle}
                            aria-label={`Mark ${task.title} as ${task.status === "completed" ? "pending" : "completed"
                                }`}
                            className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-[#4800FF] focus:ring-2 focus:ring-purple-500"
                        />

                        <button
                            type="button"
                            onClick={() => navigate(`/task/${id}`)}
                            className="min-w-0 flex-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                        >
                            <h3
                                className={`wrap-words text-sm font-semibold sm:text-base ${task.status === "completed"
                                    ? "text-gray-400 line-through"
                                    : "text-gray-900"
                                    }`}
                            >
                                {task.title}
                            </h3>

                            {task.description && (
                                <p className="mt-1 line-clamp-2 wrap-words text-sm leading-5 text-gray-500">
                                    {task.description}
                                </p>
                            )}
                        </button>
                    </div>

                    <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${task.priority === "high"
                            ? "bg-red-50 text-red-700"
                            : task.priority === "medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-green-50 text-green-700"
                            }`}
                    >
                        {task.priority || "low"}
                    </span>
                </div>

                {/* Task metadata */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {task.category || "General"}
                    </span>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${task.status === "completed"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {task.status || "pending"}
                    </span>
                </div>

                {/* Due date and actions */}
                <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-400">
                            DUE DATE
                        </p>
                        <p className="mt-1 wrap-words text-sm text-gray-700">
                            {task.due_date || "No due date"}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-1">
                        <button
                            type="button"
                            onClick={handleEditButton}
                            className="rounded-lg border border-purple-100 px-3 py-2 text-sm font-medium text-[#4800FF] transition hover:bg-purple-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            onClick={() => deleteTask(task.task_id)}
                            className="rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </article>
        </>
    );


}

export default TaskCard