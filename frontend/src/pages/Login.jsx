import { useState } from 'react'
import { apiUrl } from '../api/api.js'
import { useAuth } from '../context/authContext.jsx'
import { useNavigate, Link } from 'react-router-dom'

function Login() {

  const {setAccessToken} = useAuth()
  const [form, setForm] = useState({ identifier: '', password: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...form })
      })
      const {message, accessToken} = await response.json();
      setAccessToken(accessToken)
      navigate('/home')

      console.log(message)
    }
    catch (err) {
      console.log(err)
    }
  }
  console.log(form)

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
  <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-slate-200">
    <h1 className="text-3xl font-bold text-center text-slate-800">
      Welcome Back
    </h1>
    <p className="text-center text-slate-500 mt-2 mb-8">
      Login to manage your todos
    </p>

    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email / Username */}
      <div>
        <label
          htmlFor="identifier"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Email or Username
        </label>

        <input
          type="text"
          id="identifier"
          placeholder="Enter your email or username"
          value={form.identifier}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              identifier: e.target.value,
            }))
          }
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          Password
        </label>

        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          value={form.password}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              password: e.target.value,
            }))
          }
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700 active:scale-[0.98]"
      >
        Login
      </button>
    </form>

    <p className="mt-6 text-center text-sm text-slate-500">
      Don't have an account?{" "}
      <Link
        to='/register'
        className="font-medium text-blue-600 hover:underline"
      >
        Sign up
      </Link>
    </p>
  </div>
</div>
  )
}

export default Login