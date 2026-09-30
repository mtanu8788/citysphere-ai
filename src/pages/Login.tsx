import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"

function Login() {
  const [showPassword, setShowPassword] = useState(false)

  // Store email and password
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Store login error
  const [error, setError] = useState("")

  const navigate = useNavigate()

  // Login function
  const handleLogin = async () => {
    try {
      setError("")

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || "Login failed")
        return
      }

      console.log("Login successful:", data)

      // Redirect to dashboard
      navigate("/dashboard")

    } catch (error) {
      console.error(error)
      setError("Unable to connect to server")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            CitySphere AI
          </h1>

          <p className="text-slate-500 mt-2">
            Smarter Mobility. Better Cities.
          </p>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Welcome Back!
          </h2>

          <p className="text-slate-500 mt-1">
            Sign in to your CitySphere account
          </p>
        </div>

        {/* Google Button */}
        <div className="w-full flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("Google login successful:", credentialResponse)
            }}
            onError={() => {
              console.log("Google Login Failed")
            }}
          />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-slate-200 flex-1"></div>

          <span className="text-sm text-slate-400">
            OR
          </span>

          <div className="h-px bg-slate-200 flex-1"></div>
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

        {/* Password */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 pr-12
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-slate-500 hover:text-slate-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-3">
            {error}
          </p>
        )}

        {/* Forgot Password */}
        <div className="text-right mb-6 mt-3">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In */}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white rounded-lg py-3
                     font-semibold hover:bg-blue-700 transition"
        >
          Sign In
        </button>

        {/* Signup */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Create Account
          </button>
        </p>

      </div>
    </div>
  )
}

export default Login