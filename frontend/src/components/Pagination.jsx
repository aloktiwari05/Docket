import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTasks } from '../context/taskContext'

function Pagination() {

  const { stats: { pageCount, totalTasks }, pageNumber, setPageNumber } = useTasks();
  const pages = [];
  const tasksPerPage = 5

  const startTask = (pageNumber - 1) * tasksPerPage + 1
  const endTask = Math.min(pageNumber * tasksPerPage, totalTasks)

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  if (pageCount === 0) {
    return null
  }

  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium">{(startTask === endTask) ? startTask : `${startTask}-${endTask}`}</span> of{" "}
        <span className="font-medium">{totalTasks}</span> tasks
      </p>

      <div className="flex items-center gap-2">
        {/* Previous */}
        {pageNumber > 1 &&
          (<button onClick={() => setPageNumber(prev => prev - 1)} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition hover:bg-gray-100 hover:shadow" aria-label="Previous page">
            <ChevronLeft size={18} />
          </button>)}

        {/* Page Numbers */}
        {pages.map((page) => <button key={page} onClick={() => setPageNumber(page)} className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium shadow-sm transition hover:shadow ${page === pageNumber ? 'bg-[#3d00d6] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-100'}`}>
          {page}
        </button>)}

        {/* Next */}
        {pageNumber < pageCount &&
          (<button onClick={() => setPageNumber(prev => prev + 1)} className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition hover:bg-gray-100 hover:shadow" aria-label="Next page">
            <ChevronRight size={18} />
          </button>)}

      </div>
    </div>

  )
}

export default Pagination