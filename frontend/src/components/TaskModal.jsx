
import { useEffect, useState, useCallback } from 'react';
import { useTasks } from '../context/taskContext.jsx';
import EditTaskModal from './EditTaskModal.jsx';
import { Pencil, Trash2, CalendarDays, Flag, CheckCircle2, CircleDashed, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

function Task() {
  const { allTasks, editTask, setEditTask, deleteTask, searchTasks } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const closeModal = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
  const handleEscape = (e) => {
    if (e.key !== 'Escape') return;

    // Close the edit modal first
    if (editTask) {
      setEditTask(null);
      return;
    }

    // Otherwise close task details
    closeModal();
  };

  window.addEventListener('keydown', handleEscape);

  return () => {
    window.removeEventListener('keydown', handleEscape);
  };
}, [editTask, setEditTask, closeModal]);

  useEffect(() => {
    let isMounted = true;

    const loadTask = async () => {
      setIsLoading(true);

      try {
        const taskId = Number(id);

        if (!Number.isInteger(taskId) || taskId <= 0) {
          if (isMounted) setTask(null);
          return;
        }

        const currentTask = allTasks.find(
          (item) => Number(item.task_id) === taskId
        );

        if (currentTask) {
          if (isMounted) setTask(currentTask);
          return;
        }

        const result = await searchTasks(id);

        const tasks = Array.isArray(result) ? result : [];

        const matchedTask = tasks.find(
          (item) => Number(item.task_id) === taskId
        );

        if (isMounted) {
          setTask(matchedTask ?? null);
        }
      } catch (error) {
        console.error('Failed to load task:', error);

        if (isMounted) {
          setTask(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTask();

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

  const formatPriority = (value) =>
    value
      ? String(value).charAt(0).toUpperCase() + String(value).slice(1)
      : 'Medium';

  const formatStatus = (value) =>
    value
      ? String(value).charAt(0).toUpperCase() + String(value).slice(1)
      : 'Pending';

  const handleEditButton = () => {
    if (!task) return;
    setEditTask({ ...task });
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task.task_id);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute right-5 top-5 z-10 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {isLoading ? (
          <div className="flex min-h-75 items-center justify-center text-gray-500">
            Loading task...
          </div>
        ) : !task ? (
          <div className="flex min-h-75 items-center justify-center text-gray-500">
            Task not found.
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-7 sm:px-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#4800FF]">
                Task Details
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="wrap-break-word pr-8 text-2xl font-bold tracking-tight text-gray-900">
                  {task.title || 'Untitled task'}
                </h2>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${priorityStyle[
                      String(task.priority || 'medium').toLowerCase()
                    ] || 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    <Flag size={15} />
                    {formatPriority(task.priority)}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${statusStyle[
                      String(task.status || 'pending').toLowerCase()
                    ] || 'bg-slate-100 text-slate-700'
                      }`}
                  >
                    {String(task.status).toLowerCase() === 'completed' ? (
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
            <div className="space-y-7 px-6 py-7 sm:px-8">
              <section>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Description
                </h3>

                <p className="max-w-2xl whitespace-pre-wrap wrap-break-words text-sm leading-7 text-gray-600 sm:text-base">
                  {task.description ||
                    'No description provided for this task.'}
                </p>
              </section>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Due Date */}
                <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4800FF]/10 text-[#4800FF]">
                    <CalendarDays size={21} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Due date</p>
                    <p className="mt-1 wrap-break-word font-semibold text-gray-900">
                      {task.due_date || 'No due date'}
                    </p>
                  </div>
                </div>

                {/* Priority */}
                <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4800FF]/10 text-[#4800FF]">
                    <Flag size={21} />
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {formatPriority(task.priority)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col gap-3 border-t border-gray-100 bg-gray-50/70 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50 sm:w-auto"
              >
                <Trash2 size={16} />
                Delete Task
              </button>

              <button
                type="button"
                onClick={handleEditButton}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4800FF] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3900CC] sm:w-auto"
              >
                <Pencil size={16} />
                Edit Task
              </button>
            </div>
          </>
        )}
      </div>

      {editTask && (
        <EditTaskModal
          editTask={editTask}
          setEditTask={setEditTask}
        />
      )}
    </div>
  );
}

export default Task;
