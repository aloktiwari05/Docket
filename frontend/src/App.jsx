import { Outlet } from "react-router-dom"
import Sidebar from "./components/Sidebar.jsx"

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col lg:flex-row antialiased">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default App
