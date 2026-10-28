import { useState } from "react";
import { useTasks } from "../context/taskContext";
import { useNavigate } from 'react-router-dom';


export default function TaskSearch() {
  const { searchTasks } = useTasks();
  const navigate = useNavigate()

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    const query = e.target.value.trim();

    
    if (!query) {
      setItems([]);
      setError("");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const result = await searchTasks(query);
      console.log(result)
      setItems(result ?? []);
    } catch (err) {
      console.error("Task search failed:", err);
      setItems([]);
      setError("Unable to search tasks.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-2xl">
      <div className="relative w-full">
        <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-4 shadow-sm transition focus-within:border-[#4800FF] focus-within:ring-2 focus-within:ring-[#4800FF]/20">
          <svg
            className="h-5 w-5 shrink-0 text-[#4800FF]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            type="search"
            onChange={handleSearch}
            placeholder="Search tasks..."
            className="w-80 bg-transparent py-3 text-sm outline-none"
            aria-label="Search tasks"
          />
        </div>

        {(loading || error || items.length > 0) && (
          <div
            className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto overscroll-contain rounded-xl border border-gray-200 bg-white shadow-xl"
            role="region"
            aria-label="Search results"
          >
            {loading ? (
              <p className="px-4 py-3 text-sm text-gray-500">
                Searching...
              </p>
            ) : error ? (
              <p className="px-4 py-3 text-sm text-red-500">
                {error}
              </p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {items.map((task) => (
                  <li key={task.task_id}>
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/task/${task.task_id}`);
                      }}
                      className="w-full px-4 py-3 text-left transition hover:bg-[#4800FF]/5 focus-visible:bg-[#4800FF]/5 focus-visible:outline-none"
                    >
                      <h3 className="text-sm font-semibold text-gray-900">
                        {task.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {task.description}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}