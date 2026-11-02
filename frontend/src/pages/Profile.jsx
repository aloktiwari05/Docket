import { useAuth } from '../context/authContext.jsx'
import { useTasks } from '../context/taskContext.jsx'
import { Mail, Calendar, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { user } = useAuth()
  const { stats = {} } = useTasks()
  const navigate = useNavigate()

  const { totalTasks = 0, completedTasks = 0, pendingTasks = 0 } = stats

  return (
    <div className="flex-1 w-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header banner */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-[#4800FF]/10 text-[#4800FF] font-extrabold text-3xl flex items-center justify-center shrink-0">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {user?.username || 'User Profile'}
              </h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-4 h-4 text-gray-400" />
                {user?.email || 'No email attached'}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Member
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-[#4800FF]">
                  <Calendar className="w-3.5 h-3.5" />
                  TaskFlow Active
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/settings')}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              Edit in Settings
            </button>
          </div>
        </div>

        {/* Task Activity Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Created</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">{totalTasks}</h3>
            <p className="text-xs text-gray-500 mt-1">Lifetime tasks</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Completed</p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-2">{completedTasks}</h3>
            <p className="text-xs text-gray-500 mt-1">Accomplishments</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">In Progress</p>
            <h3 className="text-3xl font-bold text-amber-600 mt-2">{pendingTasks}</h3>
            <p className="text-xs text-gray-500 mt-1">Pending tasks</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
