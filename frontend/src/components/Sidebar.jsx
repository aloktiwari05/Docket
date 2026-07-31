import { House, CheckSquare, Calendar, FileText, Settings } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: House },
  { label: 'Tasks', path: '/tasks', icon: CheckSquare },
  { label: 'Calendar', path: '/calendar', icon: Calendar },
  { label: 'Notes', path: '/notes', icon: FileText },
  { label: 'Settings', path: '/settings', icon: Settings },
]

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="w-64 h-screen bg-white sticky left-0 top-0 flex flex-col p-4 gap-2 border-r border-gray-200">
      <div className="flex items-center gap-2 mb-4 px-2">
        <span className="w-3 h-3 bg-[#4800FF] rounded-full animate-pulse shadow-sm" />
        <h1 className="text-xl font-bold tracking-wide text-[#4800FF]">
          TaskFlow
        </h1>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
          const isActive = location.pathname === path

          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 px-3 py-2.5 w-full text-left font-medium rounded-md transition-all ${isActive
                  ? 'bg-[#4800FF] text-white shadow-md'
                  : 'text-black hover:bg-[#4800FF]/10'
                }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? 'text-white' : 'text-black'
                  }`}
              />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar