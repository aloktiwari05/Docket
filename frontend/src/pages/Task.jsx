import { useEffect, useState } from 'react';
import { useTasks } from '../context/taskContext.jsx';
import EditTaskModal from '../components/EditTaskModal.jsx';
import { Pencil, Trash2, CalendarDays, Flag, CheckCircle2, CircleDashed } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

function Task() {
  const { allTasks, editTask, setEditTask, deleteTask, searchTasks } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate()
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadTask = async () => {
      try {
        const currentTask = allTasks.find((item) => Number(item.task_id) === Number(id));

        if (currentTask) {
          if (isMounted) setTask(currentTask);
          return;
        }

        const result = await searchTasks(id);
        const tasks = Array.isArray(result) ? result : [];
        const matchedTask = tasks.find((item) => Number(item.task_id) === Number(id)) ?? tasks[0] ?? null;

        if (isMounted) setTask(matchedTask);
      } catch (error) {
        console.error('Failed to load task:', error);
        if (isMounted) setTask(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    if (id) {
      loadTask();
    }

    return () => {
      isMounted = false;
    };
  }, [id, allTasks, searchTasks]);

  const priorityStyle = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    high: 'bg-red-100 text-red-700'
  };

  const statusStyle = {
    completed: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-slate-100 text-slate-700'
  };

  const formatPriority = (value) => (value ? String(value).charAt(0).toUpperCase() + String(value).slice(1) : 'Medium');
  const formatStatus = (value) => (value ? String(value).charAt(0).toUpperCase() + String(value).slice(1) : 'Pending');

  const handleEditButton = () => {
    if (!task) return;
    setEditTask({ ...task });
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.task_id);
      navigate(-1);
    } catch (error) {
      console.log(error)
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-gray-600">
        Loading task...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 text-gray-600">
        Task not found.
      </div>
    );
  }

  return (

    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-gray-50 px-4 py-8 sm:px-6">

      <div className="mb-10 text-xl font-semibold uppercase tracking-widest text-[#4800FF]">
        Task Details
      </div>

      <div className="w-full max-w-3xl">

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-6 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="min-w-0">

                  <h2 className="wrap-words text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {task.title || "Untitled task"}
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:justify-end">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${priorityStyle[String(task.priority || "medium").toLowerCase()] ||
                    "bg-gray-100 text-gray-700"
                    }`}
                >
                  <Flag size={15} />
                  {formatPriority(task.priority)}
                </span>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${statusStyle[String(task.status || "pending").toLowerCase()] ||
                    "bg-slate-100 text-slate-700"
                    }`}
                >
                  {task.status === "completed" ? (
                    <CheckCircle2 size={15} />
                  ) : (
                    <CircleDashed size={15} />
                  )}
                  {formatStatus(task.status)}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8 px-6 py-7 sm:px-8 sm:py-8">
            <section>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                Description
              </h3>

              <p className="max-w-2xl whitespace-pre-wrap wrap-words text-sm leading-7 text-gray-600 sm:text-base">
                {task.description || "No description provided for this task."}
              </p>
            </section>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Due Date */}
              <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50/70 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4800FF]/10 text-[#4800FF]">
                  <CalendarDays size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Due date</p>
                  <p className="mt-1 wrap-words font-semibold text-gray-900">
                    {task.due_date || "No due date"}
                  </p>
                </div>
              </div>

              {/* Priority */}
              <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50/70 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4800FF]/10 text-[#4800FF]">
                  <Flag size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Priority</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {formatPriority(task.priority)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
            <button
              type="button"
              onClick={() => handleDelete()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 sm:w-auto"
            >
              <Trash2 size={16} />
              Delete Task
            </button>

            <button
              type="button"
              onClick={handleEditButton}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4800FF] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3900CC] focus:outline-none focus:ring-2 focus:ring-[#4800FF] focus:ring-offset-2 sm:w-auto"
            >
              <Pencil size={16} />
              Edit Task
            </button>
          </div>
        </div>

        {editTask && (
          <EditTaskModal
            editTask={editTask}
            setEditTask={setEditTask}
          />
        )}
      </div>
    </div>

  );
}

export default Task;