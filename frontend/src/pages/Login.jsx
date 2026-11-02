import { useState } from 'react'
import { useAuth } from '../context/authContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, Loader2, ArrowRight } from 'lucide-react'

function Login() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({ identifier: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const success = await login(formData)
      if (success) {
        navigate('/dashboard')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/40 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-10 shadow-xl border border-gray-100 transition-all">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to manage your tasks and stay productive
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email / Username */}
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email or Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="text"
                id="identifier"
                placeholder="Enter your email or username"
                autoComplete="username"
                value={formData.identifier}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    identifier: e.target.value,
                  }))
                }
                required
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none transition duration-200 focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    password: e.target.value,
                  }))
                }
                required
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none transition duration-200 focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#4800FF] py-3.5 px-4 font-semibold text-white shadow-md shadow-[#4800FF]/25 transition duration-200 hover:bg-[#3d00d6] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#4800FF] hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
