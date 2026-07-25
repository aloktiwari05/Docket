import { useState } from 'react';
import { apiUrl } from '../api/api.js';
import {useAuth} from '../context/authContext.jsx'
import { useNavigate } from 'react-router-dom';

function Register() {

  const navigate = useNavigate()

  const {setAccessToken} = useAuth()
  const [form, setForm] = useState({ username: '', email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/api/signup`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...form }),

        credentials: 'include'
      })
      const {message , user, accessToken} = await response.json()
      setAccessToken(accessToken)
      console.log(message, user, accessToken )
      navigate('/home')
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
  <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl p-8">
    <h1 className="text-3xl font-bold text-center text-slate-800 mb-8">
      Register
    </h1>

    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-slate-700"
        >
          Name
        </label>

        <input
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          type="text"
          id="username"
          autoComplete="username"
          value={form.username}
          onChange={(e) =>
            setForm((f) => ({ ...f, username: e.target.value }))
          }
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) =>
            setForm((f) => ({ ...f, email: e.target.value }))
          }
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          type="password"
          minLength={8}
          autoComplete="new-password"
          value={form.password}
          onChange={(e) =>
            setForm((f) => ({ ...f, password: e.target.value }))
          }
          required
        />
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition duration-200 active:scale-[0.98]"
        type="submit"
      >
        Register
      </button>
    </form>
  </div>
</div>
  )
}

export default Register;