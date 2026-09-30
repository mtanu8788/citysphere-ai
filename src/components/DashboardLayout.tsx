import { ReactNode } from "react"
import { useNavigate, useLocation } from "react-router-dom"

interface DashboardLayoutProps {
  children: ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-950 text-white min-h-screen flex flex-col">

        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-800">

          <h1 className="text-2xl font-bold">
            CitySphere
            <span className="text-blue-400"> AI</span>
          </h1>

          <p className="text-xs text-slate-400 mt-1">
            Intelligent Urban Mobility
          </p>

        </div>


        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">

          <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mb-3">
            Overview
          </p>


          {/* Dashboard */}
          <button
            onClick={() => navigate("/dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
              isActive("/dashboard")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>⌂</span>
            <span>Dashboard</span>
          </button>


          {/* Live Map */}
          <button
            onClick={() => navigate("/map")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
              isActive("/map")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>◉</span>
            <span>Live City Map</span>
          </button>


          {/* Report */}
          <button
            onClick={() => navigate("/report")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
              isActive("/report")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>⚑</span>
            <span>Report an Issue</span>
          </button>


          {/* My Reports */}
          <button
            onClick={() => navigate("/reports")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
              isActive("/reports")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>▣</span>
            <span>My Reports</span>
          </button>


          {/* Mobility */}
          <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mb-3 mt-8">
            Mobility
          </p>


          {/* Traffic */}
          <button
            onClick={() => navigate("/traffic")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
              isActive("/traffic")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>◆</span>
            <span>Traffic & Congestion</span>
          </button>


          {/* Parking */}
          <button
            onClick={() => navigate("/parking")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
              isActive("/parking")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>▤</span>
            <span>Parking</span>
          </button>


          {/* Intelligence */}
          <p className="text-xs uppercase tracking-wider text-slate-500 px-3 mb-3 mt-8">
            Intelligence
          </p>


          {/* Analytics */}
          <button
            onClick={() => navigate("/analytics")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 ${
              isActive("/analytics")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>◈</span>
            <span>Analytics</span>
          </button>


          {/* AI Insights */}
          <button
            onClick={() => navigate("/ai-insights")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
              isActive("/ai-insights")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>✦</span>
            <span>AI Insights</span>
          </button>

        </nav>


        {/* Bottom Navigation */}
        <div className="border-t border-slate-800 p-4">

          <button
            onClick={() => navigate("/settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 ${
              isActive("/settings")
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>⚙</span>
            <span>Settings</span>
          </button>


          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            <span>↪</span>
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">

        {/* TOP HEADER */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold text-slate-800">
              City Mobility Intelligence
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Smart insights for better urban mobility
            </p>

          </div>


          <div className="flex items-center gap-6">

            <button className="text-slate-500 hover:text-slate-800 text-lg">
              🔔
            </button>


            <div className="flex items-center gap-3">

              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                T
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-800">
                  Tanuja Mane
                </p>

                <p className="text-xs text-slate-500">
                  Citizen
                </p>

              </div>

            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}
        <main className="flex-1">
          {children}
        </main>

      </div>

    </div>
  )
}

export default DashboardLayout