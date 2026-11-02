import { useState, useRef, useEffect } from "react";
import { useTasks } from "../context/taskContext";
import { useNavigate } from 'react-router-dom';
import { Search, X, Loader2 } from 'lucide-react';

export default function TaskSearch() {
  const { searchTasks } = useTasks();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);
    const trimmed = val.trim();

    if (!trimmed) {
      setItems([]);
      setError("");
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setError("");
    setIsOpen(true);

    try {
      const result = await searchTasks(trimmed);
      setItems(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Task search failed:", err);
      setItems([]);
      setError("Unable to search tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTask = (taskId) => {
    setIsOpen(false);
    setQuery("");
    setItems([]);
    navigate(`/task/${taskId}`);
  };

  const handleClear = () => {
    setQuery("");
    setItems([]);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xs sm:max-w-md">
      <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 shadow-xs transition focus-within:border-[#4800FF] focus-within:ring-4 focus-within:ring-[#4800FF]/10">
        <Search className="h-4 w-4 shrink-0 text-gray-400" />

        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => {
            if (query.trim() && (items.length > 0 || loading || error)) {
              setIsOpen(true);
            }
          }}
          placeholder="Search tasks..."
          className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 outline-none"
          aria-label="Search tasks"
        />

        {loading && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#4800FF]" />}

        {query && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {isOpen && (loading || error || items.length > 0 || (query.trim() && !loading)) && (
        <div
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto overscroll-contain rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl"
          role="region"
          aria-label="Search results"
        >
          {loading ? (
            <p className="px-3 py-3 text-sm text-gray-500 text-center">
              Searching tasks...
            </p>
          ) : error ? (
            <p className="px-3 py-3 text-sm text-red-500 text-center">
              {error}
            </p>
          ) : items.length === 0 ? (
            <p className="px-3 py-3 text-sm text-gray-500 text-center">
              No tasks found matching &quot;{query}&quot;
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((task) => (
                <li key={task.task_id}>
                  <button
                    type="button"
                    onClick={() => handleSelectTask(task.task_id)}
                    className="w-full px-3 py-2.5 text-left rounded-xl transition hover:bg-[#4800FF]/5 focus-visible:bg-[#4800FF]/5 focus-visible:outline-none"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">
                        {task.title}
                      </h4>
                      {task.priority && (
                        <span className="shrink-0 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                          {task.priority}
                        </span>
                      )}
                    </div>

                    {task.description && (
                      <p className="mt-0.5 text-xs text-gray-500 line-clamp-1">
                        {task.description}
                      </p>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
