const express = require("express")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")

const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")
const categoryRoutes = require("./routes/categoryRoutes")

const app = express()

connectDB()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ].filter(Boolean),

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
)
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "API Tu Pharmacy funcionando"
  })
})

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/categories", categoryRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en http://localhost:${PORT}`
  )
})