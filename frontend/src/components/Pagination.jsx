import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTasks } from '../context/taskContext'

function Pagination() {

  const { setPage } = useTasks();

  return (
    <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">1-10</span> of{" "}
            <span className="font-medium">24</span> tasks
          </p>

          <div className="flex items-center gap-2">
            {/* Previous */}
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition hover:bg-gray-100 hover:shadow">
              <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            <button onClick={()=>setPage(1)}className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 hover:shadow">
              1
            </button>

            <button onClick={()=>setPage(2)} className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-100 hover:shadow">
              2
            </button>

            {/* Next */}
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition hover:bg-gray-100 hover:shadow">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

  )
}

export default Pagination