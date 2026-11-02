import { useState } from 'react'
import { useAuth } from '../context/authContext.jsx'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Mail, User, Loader2, ArrowRight } from 'lucide-react'
import { toast } from 'react-toastify'

function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.password.length < 8) {
      toast.warning("Password must be at least 8 characters long")
      return
    }

    setIsSubmitting(true)

    try {
      const success = await register(form)
      if (success) {
        navigate('/dashboard')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/40 px-4 py-8">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-xl p-6 sm:p-10 transition-all">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Get started with TaskFlow to organize your workflow
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="h-5 w-5" />
              </div>
              <input
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none transition duration-200 focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10"
                type="text"
                id="username"
                placeholder="Choose a username"
                autoComplete="username"
                value={form.username}
                onChange={(e) =>
                  setForm((f) => ({ ...f, username: e.target.value }))
                }
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="h-5 w-5" />
              </div>
              <input
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none transition duration-200 focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10"
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
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
                className="w-full rounded-xl border border-gray-200 pl-10 pr-4 py-3 text-sm outline-none transition duration-200 focus:border-[#4800FF] focus:ring-4 focus:ring-[#4800FF]/10"
                id="password"
                type="password"
                placeholder="Minimum 8 characters"
                minLength={8}
                autoComplete="new-password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#4800FF] py-3.5 px-4 font-semibold text-white shadow-md shadow-[#4800FF]/25 transition duration-200 hover:bg-[#3d00d6] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#4800FF] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
