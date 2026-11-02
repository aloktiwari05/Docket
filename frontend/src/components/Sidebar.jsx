import { useState } from 'react'
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  CheckCircle2
} from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext.jsx'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Tasks', path: '/tasks', icon: CheckSquare },
  { label: 'Calendar', path: '/calendar', icon: Calendar },
  { label: 'Notes', path: '/notes', icon: FileText },
  { label: 'Settings', path: '/settings', icon: Settings },
]

function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  const handleNav = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  const handleLogout = async () => {
    setMobileOpen(false)
    await logout()
    navigate('/login')
  }

  const renderNavContent = () => (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Brand */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-2.5">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#4800FF]">
                Docket
              </h1>
              <p className="text-[11px] font-medium text-gray-400">Personal Workspace</p>
            </div>
          </div>
          {/* Close button on mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname.startsWith(path)

            return (
              <button
                key={path}
                type="button"
                onClick={() => handleNav(path)}
                className={`flex items-center gap-3 px-3.5 py-2.5 w-full text-left font-medium rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#4800FF] text-white shadow-sm shadow-[#4800FF]/30'
                    : 'text-gray-700 hover:bg-[#4800FF]/10 hover:text-[#4800FF]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-500'
                  }`}
                />
                <span className="text-sm">{label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* User profile & logout footer */}
      <div className="pt-4 border-t border-gray-100 mt-6">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 mb-2">
          <div className="w-9 h-9 rounded-full bg-[#4800FF]/10 text-[#4800FF] font-semibold flex items-center justify-center text-sm">
            {user?.username ? user.username.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {user?.username || 'User'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || ''}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2 w-full text-left font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all text-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Top App Bar */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-1 text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4800FF]"
            aria-label="Open sidebar navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#4800FF] tracking-tight">Docket</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#4800FF]/10 text-[#4800FF] font-semibold flex items-center justify-center text-xs">
            {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Panel */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white p-5 shadow-2xl transition-transform duration-300 ease-in-out transform ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {renderNavContent()}
      </aside>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 h-screen sticky top-0 left-0 bg-white border-r border-gray-200 p-5 flex-col shrink-0">
        {renderNavContent()}
      </aside>
    </>
  )
}

export default Sidebar
