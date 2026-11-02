import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTasks } from '../context/taskContext';

function Pagination() {
  const { stats = {}, pageNumber = 1, setPageNumber } = useTasks();
  const { pageCount = 0, totalTasks = 0 } = stats;
  const tasksPerPage = 5;

  if (pageCount <= 1 && totalTasks <= tasksPerPage) {
    return null;
  }

  const startTask = (pageNumber - 1) * tasksPerPage + 1;
  const endTask = Math.min(pageNumber * tasksPerPage, totalTasks);

  // Helper to generate truncated pagination numbers (e.g. 1, 2, ..., 7, 8)
  const getPageNumbers = () => {
    if (pageCount <= 5) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    if (pageNumber <= 3) {
      return [1, 2, 3, '...', pageCount];
    }

    if (pageNumber >= pageCount - 2) {
      return [1, '...', pageCount - 2, pageCount - 1, pageCount];
    }

    return [1, '...', pageNumber, '...', pageCount];
  };

  const pages = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
      <p className="text-xs sm:text-sm text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {totalTasks > 0 ? (startTask === endTask ? startTask : `${startTask}-${endTask}`) : 0}
        </span>{" "}
        of <span className="font-semibold text-gray-900">{totalTasks}</span> tasks
      </p>

      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-2xs transition hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Buttons */}
        <div className="flex items-center gap-1">
          {pages.map((item, index) => {
            if (item === '...') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-9 w-7 items-center justify-center text-xs text-gray-400 select-none"
                >
                  •••
                </span>
              );
            }

            const isCurrent = item === pageNumber;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setPageNumber(item)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold transition ${
                  isCurrent
                    ? 'bg-[#4800FF] text-white shadow-xs'
                    : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, pageCount))}
          disabled={pageNumber >= pageCount}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-2xs transition hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
