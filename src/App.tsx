import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"

import Dashboard from "./pages/Dashboard"
import LiveMap from "./pages/LiveMap"
import ReportIssue from "./pages/ReportIssue"
import MyReports from "./pages/MyReports"
import Traffic from "./pages/Traffic"
import Parking from "./pages/Parking"
import Analytics from "./pages/Analytics"
import AIInsights from "./pages/AIInsights"
import Settings from "./pages/Settings"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<LiveMap />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/reports" element={<MyReports />} />
        <Route path="/traffic" element={<Traffic />} />
        <Route path="/parking" element={<Parking />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/ai-insights" element={<AIInsights />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App