const mysql = require("mysql2")

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "8788",
  database: "citysphere_ai"
})

db.connect((error) => {
  if (error) {
    console.error("MySQL connection failed:", error.message)
    return
  }

  console.log("MySQL connected successfully")
})

module.exports = db