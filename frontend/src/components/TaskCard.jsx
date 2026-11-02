import { useNavigate } from "react-router-dom"
import { useTasks } from "../context/taskContext.jsx"
import { Calendar, Tag, Trash2, Edit3 } from "lucide-react"

const TaskCard = ({ task, setEditTask }) => {
    const id = task.task_id
    const { deleteTask, toggleStatus } = useTasks()
    const navigate = useNavigate()

    const handleEditButton = (e) => {
        e.stopPropagation()
        setEditTask(task)
    }

    const handleDeleteButton = async (e) => {
        e.stopPropagation()
        await deleteTask(task.task_id)
    }

    const priorityBadge = (priority) => {
        const p = String(priority || 'low').toLowerCase()
        if (p === 'high') {
            return <span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase bg-rose-50 text-rose-700 border border-rose-100">High</span>
        }
        if (p === 'medium') {
            return <span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase bg-amber-50 text-amber-700 border border-amber-100">Medium</span>
        }
        return <span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase bg-emerald-50 text-emerald-700 border border-emerald-100">Low</span>
    }

    const statusBadge = (status) => {
        const isDone = status === "completed"
        return (
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold capitalize ${
                isDone
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-gray-100 text-gray-700 border border-gray-200"
            }`}>
                {isDone ? "Completed" : "Pending"}
            </span>
        )
    }

    return (
        <>
            {/* Desktop Table Row (lg and up) */}
            <div
                className={`hidden lg:grid grid-cols-[minmax(0,2.5fr)_minmax(90px,1fr)_minmax(85px,0.9fr)_minmax(110px,1.1fr)_minmax(95px,1fr)_minmax(120px,1.2fr)] items-center gap-3 border-b border-gray-100 px-5 py-4 transition hover:bg-gray-50/80 ${
                    task.status === "completed" ? "bg-gray-50/50" : "bg-white"
                }`}
            >
                {/* Task Title & Description */}
                <div className="flex min-w-0 items-start gap-3.5">
                    <input
                        type="checkbox"
                        checked={task.status === "completed"}
                        onChange={() => toggleStatus(task)}
                        aria-label={`Mark ${task.title} as ${task.status === "completed" ? "pending" : "completed"}`}
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-[#4800FF]"
                    />

                    <div
                        onClick={() => navigate(`/task/${id}`)}
                        className="min-w-0 flex-1 cursor-pointer"
                    >
                        <h3
                            className={`truncate text-sm font-semibold ${
                                task.status === "completed"
                                    ? "text-gray-400 line-through"
                                    : "text-gray-900 hover:text-[#4800FF] transition-colors"
                            }`}
                        >
                            {task.title}
                        </h3>

                        {task.description && (
                            <p className="mt-0.5 truncate text-xs text-gray-500">
                                {task.description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Category */}
                <div className="min-w-0">
                    <span className="inline-flex items-center gap-1 max-w-full truncate rounded-lg bg-blue-50/80 px-2.5 py-1 text-xs font-medium text-blue-700">
                        <Tag className="w-3 h-3 shrink-0" />
                        <span className="truncate">{task.category || "General"}</span>
                    </span>
                </div>

                {/* Priority */}
                <div>
                    {priorityBadge(task.priority)}
                </div>

                {/* Due Date */}
                <div className="min-w-0 text-xs text-gray-600 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                    <span className="truncate">{task.due_date || "No due date"}</span>
                </div>

                {/* Status */}
                <div>
                    {statusBadge(task.status)}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5 justify-end">
                    <button
                        type="button"
                        onClick={handleEditButton}
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#4800FF] transition hover:bg-purple-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                    >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={handleDeleteButton}
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                    </button>
                </div>
            </div>

            {/* Mobile / Tablet Card View (< lg) */}
            <article
                className={`lg:hidden border-b border-gray-100 p-4 transition last:border-b-0 hover:bg-gray-50/80 ${
                    task.status === "completed" ? "bg-gray-50/50" : "bg-white"
                }`}
            >
                {/* Title & Checkbox */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                        <input
                            type="checkbox"
                            checked={task.status === "completed"}
                            onChange={() => toggleStatus(task)}
                            aria-label={`Mark ${task.title} as ${task.status === "completed" ? "pending" : "completed"}`}
                            className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-[#4800FF]"
                        />

                        <div
                            onClick={() => navigate(`/task/${id}`)}
                            className="min-w-0 flex-1 cursor-pointer"
                        >
                            <h3
                                className={`wrap-break-word text-sm font-semibold sm:text-base ${
                                    task.status === "completed"
                                        ? "text-gray-400 line-through"
                                        : "text-gray-900"
                                }`}
                            >
                                {task.title}
                            </h3>

                            {task.description && (
                                <p className="mt-1 line-clamp-2 wrap-break-word text-xs sm:text-sm text-gray-500 leading-relaxed">
                                    {task.description}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="shrink-0">
                        {priorityBadge(task.priority)}
                    </div>
                </div>

                {/* Metadata & Actions */}
                <div className="mt-3.5 pt-3 border-t border-gray-100/70 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">
                            {task.category || "General"}
                        </span>
                        {statusBadge(task.status)}
                        {task.due_date && (
                            <span className="text-[11px] text-gray-500 flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-gray-400" />
                                {task.due_date}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1.5 ml-auto">
                        <button
                            type="button"
                            onClick={handleEditButton}
                            className="rounded-lg border border-purple-100 px-3 py-1.5 text-xs font-semibold text-[#4800FF] transition hover:bg-purple-50"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            onClick={handleDeleteButton}
                            className="rounded-lg border border-rose-100 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </article>
        </>
    );
};

export default TaskCard;
