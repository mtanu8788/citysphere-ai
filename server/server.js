
require("dotenv").config()
const express=require("express")
const bcrypt = require("bcryptjs")
const cors = require("cors")
const crypto = require("crypto")
const db = require("./config/db")
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})
const { OAuth2Client } = require("google-auth-library")
const googleClient = new OAuth2Client("230247079412-ognm902k0bvujt8j3fr58i4uiqivggfa.apps.googleusercontent.com")

const app=express()
app.use(express.json())
app.use(cors())
const PORT=5000
app.get("/",(req,res)=>{
    res.send("CitySphere AI Backend is runniing!")
})
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    // Check required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields"
      })
    }

    // Check if email already exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?"

    db.query(checkUserQuery, [email], async (error, results) => {
      if (error) {
        console.error(error)
        return res.status(500).json({
          message: "Database error"
        })
      }

      if (results.length > 0) {
        return res.status(409).json({
          message: "Email already registered"
        })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Insert user
      const insertUserQuery = `
        INSERT INTO users (full_name, email, password)
        VALUES (?, ?, ?)
      `

      db.query(
        insertUserQuery,
        [fullName, email, hashedPassword],
        (error) => {
          if (error) {
            console.error(error)
            return res.status(500).json({
              message: "Failed to create account"
            })
          }

          res.status(201).json({
            message: "Account created successfully"
          })
        }
      )
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server error"
    })
  }
})
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      })
    }

    const query = "SELECT * FROM users WHERE email = ?"

    db.query(query, [email], async (error, results) => {

      if (error) {
        console.error(error)
        return res.status(500).json({
          message: "Database error"
        })
      }

      if (results.length === 0) {
        return res.status(401).json({
          message: "Invalid email or password"
        })
      }

      const user = results[0]

      const passwordMatch = await bcrypt.compare(
        password,
        user.password
      )

      if (!passwordMatch) {
        return res.status(401).json({
          message: "Invalid email or password"
        })
      }

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          fullName: user.full_name,
          email: user.email,
          role: user.role
        }
      })
    })

  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: "Server error"
    })
  }
})
app.post("/api/auth/google", async (req, res) => {
  try {
    const { credential } = req.body

    if (!credential) {
      return res.status(400).json({
        message: "Google credential is required"
      })
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: "230247079412-ognm902k0bvujt8j3fr58i4uiqivggfa.apps.googleusercontent.com"
    })

    const payload = ticket.getPayload()

    const googleId = payload.sub
    const email = payload.email
    const fullName = payload.name

    console.log("Google user:", {
      googleId,
      email,
      fullName
    })

    res.json({
      message: "Google login verified successfully",
      user: {
        googleId,
        email,
        fullName
      }
    })

  } catch (error) {
    console.error("Google verification error:", error)

    res.status(401).json({
      message: "Invalid Google credential"
    })
  }
})
app.post("/api/auth/forgot-password", (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    })
  }

  const query = "SELECT id, full_name, email FROM users WHERE email = ?"

  db.query(query, [email], async (error, results) => {
    if (error) {
      console.error("Database error:", error)

      return res.status(500).json({
        message: "Database error",
      })
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "No account found with this email",
      })
    }

    const user = results[0]

    // Generate secure random token
    const resetToken = crypto.randomBytes(32).toString("hex")

    // Token expires after 15 minutes
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000)

    const updateQuery = `
      UPDATE users
      SET reset_token = ?, reset_token_expiry = ?
      WHERE id = ?
    `

    db.query(
      updateQuery,
      [resetToken, resetTokenExpiry, user.id],
      async (updateError) => {
        if (updateError) {
          console.error("Token save error:", updateError)

          return res.status(500).json({
            message: "Failed to create reset token",
          })
        }

        try {
          const resetLink = `http://localhost:5173/reset-password/${resetToken}`

          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "CitySphere AI - Password Reset",
            text: `Hello ${user.full_name},

We received a request to reset your CitySphere AI password.

Click the link below to reset your password:

${resetLink}

This link will expire in 15 minutes.

If you did not request a password reset, you can ignore this email.

Regards,
CitySphere AI Team`,
          })

          res.json({
            message: "Password reset link sent successfully",
          })
        } catch (emailError) {
          console.error("Email sending error:", emailError)

          res.status(500).json({
            message: "Failed to send password reset email",
          })
        }
      }
    )
  })
})
app.post("/api/auth/reset-password", async (req, res) => {
  const { token, password } = req.body

  if (!token || !password) {
    return res.status(400).json({
      message: "Token and password are required",
    })
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters",
    })
  }

  const query = `
    SELECT id
    FROM users
    WHERE reset_token = ?
    AND reset_token_expiry > NOW()
  `

  db.query(query, [token], async (error, results) => {
    if (error) {
      console.error("Token verification error:", error)

      return res.status(500).json({
        message: "Database error",
      })
    }

    if (results.length === 0) {
      return res.status(400).json({
        message: "Invalid or expired reset link",
      })
    }

    const userId = results[0].id

    try {
      const hashedPassword = await bcrypt.hash(password, 10)

      const updateQuery = `
        UPDATE users
        SET password = ?,
            reset_token = NULL,
            reset_token_expiry = NULL
        WHERE id = ?
      `

      db.query(
        updateQuery,
        [hashedPassword, userId],
        (updateError) => {
          if (updateError) {
            console.error("Password update error:", updateError)

            return res.status(500).json({
              message: "Failed to update password",
            })
          }

          res.json({
            message: "Password reset successfully",
          })
        }
      )
    } catch (hashError) {
      console.error("Password hashing error:", hashError)

      res.status(500).json({
        message: "Server error",
      })
    }
  })
})
app.listen(PORT,()=>
{
   console.log(`Server is running on http://localhost:${PORT}`)
})