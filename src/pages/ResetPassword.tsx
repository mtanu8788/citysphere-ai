import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleResetPassword = async () => {
    setMessage("")
    setError("")

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Password reset failed")
        return
      }

      setMessage(data.message)

      setTimeout(() => {
        navigate("/")
      }, 2000)
    } catch (error) {
      console.error("Reset password error:", error)
      setError("Unable to connect to server")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">
            CitySphere AI
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Reset your password
          </p>
        </div>

        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Create New Password
        </h2>

        <p className="text-sm text-slate-500 mb-6">
          Enter your new password below.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Confirm New Password
          </label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        {message && (
          <p className="text-green-600 text-sm mb-4">
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={handleResetPassword}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Reset Password
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-3 text-sm text-slate-600 hover:text-blue-600"
        >
          Back to Login
        </button>

      </div>
    </div>
  )
}

export default ResetPassword