import { useEffect, useState, useCallback } from 'react';
import { useTasks } from '../context/taskContext.jsx';
import EditTaskModal from './EditTaskModal.jsx';
import { Pencil, Trash2, CalendarDays, Flag, CheckCircle2, CircleDashed, X, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

function TaskModal() {
  const { allTasks = [], editTask, setEditTask, deleteTask, searchTasks } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const closeModal = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== 'Escape') return;

      if (editTask) {
        setEditTask(null);
        return;
      }

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

        const currentTask = (allTasks || []).find(
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
        if (isMounted) setTask(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadTask();

    return () => {
      isMounted = false;
    };
  }, [id, allTasks, searchTasks]);

  const priorityStyle = {
    low: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    medium: 'bg-amber-50 text-amber-700 border-amber-100',
    high: 'bg-rose-50 text-rose-700 border-rose-100'
  };

  const statusStyle = {
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    pending: 'bg-gray-100 text-gray-700 border-gray-200'
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
    if (!task) return;
    setIsDeleting(true);
    try {
      const success = await deleteTask(task.task_id);
      if (success) {
        closeModal();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs transition-opacity"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 z-10 rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {isLoading ? (
          <div className="flex min-h-64 flex-col items-center justify-center text-gray-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#4800FF]" />
            <p className="text-sm font-medium">Loading task details...</p>
          </div>
        ) : !task ? (
          <div className="flex min-h-64 flex-col items-center justify-center text-center p-6 text-gray-500">
            <h3 className="text-base font-semibold text-gray-800">Task Not Found</h3>
            <p className="text-xs text-gray-400 mt-1 max-w-xs">
              The task you are looking for may have been deleted or does not exist.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 rounded-xl bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="border-b border-gray-100 p-5 sm:p-7">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4800FF]">
                Task Details
              </span>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="break-words pr-8 text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                  {task.title || 'Untitled task'}
                </h2>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                      priorityStyle[
                        String(task.priority || 'medium').toLowerCase()
                      ] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Flag size={13} />
                    {formatPriority(task.priority)}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
                      statusStyle[
                        String(task.status || 'pending').toLowerCase()
                      ] || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {String(task.status).toLowerCase() === 'completed' ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <CircleDashed size={13} />
                    )}
                    {formatStatus(task.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 space-y-6 p-5 sm:p-7">
              {/* Description */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Description
                </h3>

                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-700 bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
                  {task.description ||
                    'No description provided for this task.'}
                </p>
              </section>

              {/* Metadata Cards */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {/* Due Date */}
                <div className="flex items-center gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xs">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4800FF]/10 text-[#4800FF]">
                    <CalendarDays size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 font-medium">Due Date</p>
                    <p className="mt-0.5 break-words text-sm font-semibold text-gray-900">
                      {task.due_date || 'No due date set'}
                    </p>
                  </div>
                </div>

                {/* Priority */}
                <div className="flex items-center gap-3.5 rounded-2xl border border-gray-100 bg-white p-4 shadow-2xs">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4800FF]/10 text-[#4800FF]">
                    <Flag size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400 font-medium">Priority Level</p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900">
                      {formatPriority(task.priority)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 border-t border-gray-100 bg-gray-50/80 p-4 sm:px-7">
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-rose-600 transition hover:bg-rose-50 sm:w-auto disabled:opacity-60"
              >
                {isDeleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 size={15} />
                )}
                <span>Delete Task</span>
              </button>

              <button
                type="button"
                onClick={handleEditButton}
                disabled={isDeleting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#4800FF] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-[#4800FF]/25 transition hover:bg-[#3d00d6] sm:w-auto disabled:opacity-60"
              >
                <Pencil size={15} />
                <span>Edit Task</span>
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

export default TaskModal;
