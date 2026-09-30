
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [error, setError] = useState("")

  const navigate = useNavigate()

  // Password requirements
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  // Signup function
  const handleSignup = async () => {
    setError("")

    // Check empty fields
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    // Check email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Check password requirements
    if (
      !hasMinLength ||
      !hasUppercase ||
      !hasLowercase ||
      !hasNumber ||
      !hasSpecial
    ) {
      setError("Please meet all password requirements")
      return
    }

    // Check password matching
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    // Send signup data to backend
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      // Backend error
      if (!response.ok) {
        setError(data.message || "Signup failed")
        return
      }

      // Success
      alert(data.message)

      // Go to login page
      navigate("/")
    } catch (error) {
      console.error("Signup error:", error)
      setError("Unable to connect to server")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            CitySphere AI
          </h1>

          <p className="text-slate-500 mt-2">
            Smarter Mobility. Better Cities.
          </p>
        </div>

        {/* Page Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-800">
            Create Account
          </h2>

          <p className="text-slate-500 mt-1">
            Join CitySphere and help build smarter cities
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 pr-12
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2
                         text-slate-500 hover:text-slate-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Password Requirements */}
          <div className="mt-3 text-sm">
            <p className="text-slate-600 mb-2">
              Password must contain:
            </p>

            <p className={hasMinLength ? "text-green-600" : "text-slate-400"}>
              {hasMinLength ? "✓" : "○"} At least 8 characters
            </p>

            <p className={hasUppercase ? "text-green-600" : "text-slate-400"}>
              {hasUppercase ? "✓" : "○"} One uppercase letter (A-Z)
            </p>

            <p className={hasLowercase ? "text-green-600" : "text-slate-400"}>
              {hasLowercase ? "✓" : "○"} One lowercase letter (a-z)
            </p>

            <p className={hasNumber ? "text-green-600" : "text-slate-400"}>
              {hasNumber ? "✓" : "○"} One number (0-9)
            </p>

            <p className={hasSpecial ? "text-green-600" : "text-slate-400"}>
              {hasSpecial ? "✓" : "○"} One special character
            </p>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 pr-12
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2
                         text-slate-500 hover:text-slate-700"
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Create Account */}
        <button
          type="button"
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white rounded-lg py-3
                     font-semibold hover:bg-blue-700 transition"
        >
          Create Account
        </button>

        {/* Login */}
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>

      </div>
    </div>
  )
}

export default Signup
