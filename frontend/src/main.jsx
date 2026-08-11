// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'
import Tasks from './pages/Tasks.jsx'
import Calendar from './pages/Calendar.jsx'
import Notes from './pages/Notes.jsx'
import EditTask from './pages/EditTask.jsx'
import Settings from './pages/Settings.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import ProtectedRoutes from './routes/ProtectedRoutes.jsx'
import { TaskProvider } from './context/taskContext.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route element={<ProtectedRoutes />}>
      <Route path='/' element={<App />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='profile' element={<Profile />} />
        <Route path='tasks' element={<Tasks />} />
        <Route path='/:id/edit' element={<EditTask />} />
        <Route path='calendar' element={<Calendar />} />
        <Route path='notes' element={<Notes />} />
        <Route path='settings' element={<Settings />} />
      </Route>
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='*' element={<NotFound />} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </AuthProvider>,
)