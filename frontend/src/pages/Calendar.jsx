import { useState, useMemo } from 'react';
import { useTasks } from '../context/taskContext.jsx';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Calendar() {
  const { allTasks = [] } = useTasks();
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(new Date().toISOString().split('T')[0]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calculate calendar grid days
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Previous month filler days
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ day: null, dateStr: null });
    }

    // Days of current month
    for (let d = 1; d <= totalDaysInMonth; d++) {
      const mStr = String(month + 1).padStart(2, '0');
      const dStr = String(d).padStart(2, '0');
      const dateStr = `${year}-${mStr}-${dStr}`;
      days.push({ day: d, dateStr });
    }

    return days;
  }, [year, month]);

  // Tasks grouped by date
  const tasksByDate = useMemo(() => {
    const map = {};
    (allTasks || []).forEach((t) => {
      if (t.due_date) {
        // Normalize date YYYY-MM-DD
        const dateKey = String(t.due_date).split('T')[0];
        if (!map[dateKey]) map[dateKey] = [];
        map[dateKey].push(t);
      }
    });
    return map;
  }, [allTasks]);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectedTasks = tasksByDate[selectedDateStr] || [];

  return (
    <div className="flex-1 w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Calendar
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and track your deadlines across the month
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-3 bg-white border border-gray-200/80 px-4 py-2 rounded-2xl shadow-2xs self-start sm:self-auto">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-bold text-gray-900 min-w-32 text-center">
            {monthNames[month]} {year}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid (2 columns on large screens) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 p-4 sm:p-6 shadow-xs">
          {/* Day of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-xs font-semibold text-gray-400 py-2">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {calendarDays.map((item, idx) => {
              if (!item.day) {
                return (
                  <div key={`empty-${idx}`} className="h-12 sm:h-16 rounded-xl bg-gray-50/40" />
                );
              }

              const hasTasks = (tasksByDate[item.dateStr] || []).length > 0;
              const isSelected = item.dateStr === selectedDateStr;
              const isToday = item.dateStr === new Date().toISOString().split('T')[0];

              return (
                <button
                  key={item.dateStr}
                  type="button"
                  onClick={() => setSelectedDateStr(item.dateStr)}
                  className={`h-12 sm:h-16 rounded-xl p-1 sm:p-1.5 flex flex-col items-center justify-between transition relative border ${
                    isSelected
                      ? 'border-[#4800FF] bg-[#4800FF]/5 ring-2 ring-[#4800FF]/20'
                      : isToday
                      ? 'border-purple-200 bg-purple-50/50'
                      : 'border-transparent hover:bg-gray-50'
                  }`}
                >
                  <span
                    className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday
                        ? 'bg-[#4800FF] text-white'
                        : isSelected
                        ? 'text-[#4800FF]'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.day}
                  </span>

                  {hasTasks && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4800FF] mb-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Tasks Sidebar */}
        <div className="bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Tasks for Selected Date
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {selectedDateStr || 'Select a day'}
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-[#4800FF]">
              {selectedTasks.length} {selectedTasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-96">
            {selectedTasks.length > 0 ? (
              selectedTasks.map((task) => (
                <div
                  key={task.task_id}
                  onClick={() => navigate(`/task/${task.task_id}`)}
                  className="p-3.5 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xs transition cursor-pointer bg-white"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`text-sm font-semibold truncate ${
                      task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h4>
                    {task.status === 'completed' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  {task.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center text-gray-400">
                <CalendarIcon className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-xs font-medium text-gray-500">No tasks on this date</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
