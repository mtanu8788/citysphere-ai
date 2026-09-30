import { useState } from "react"
import { useNavigate } from "react-router-dom"

function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleForgotPassword = async () => {
    setMessage("")
    setError("")

    if (!email) {
      setError("Please enter your email")
      return
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Something went wrong")
        return
      }

      setMessage(data.message)
    } catch (error) {
      console.error("Forgot password error:", error)
      setError("Unable to connect to server")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            CitySphere AI
          </h1>

          <p className="text-slate-500 mt-2">
            Smarter Mobility. Better Cities.
          </p>
        </div>

        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Forgot Password?
          </h2>

          <p className="text-slate-500 mt-2">
            Enter your email address and we'll help you reset your password.
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        {/* Success */}
        {message && (
          <p className="text-green-600 text-sm mb-4">
            {message}
          </p>
        )}

        {/* Reset Password */}
        <button
          type="button"
          onClick={handleForgotPassword}
          className="w-full bg-blue-600 text-white rounded-lg py-3
                     font-semibold hover:bg-blue-700 transition"
        >
          Send Reset Link
        </button>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-600 font-semibold hover:underline"
          >
            ← Back to Sign In
          </button>
        </div>

      </div>
    </div>
  )
}

export default ForgotPassword