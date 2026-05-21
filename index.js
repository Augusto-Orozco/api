import "dotenv/config"
import express from "express"
import morgan from "morgan"
import cors from "cors"
import indexRoutes from "./routes/index.routes.js"
import loginRoutes from "./routes/login.routes.js"
import usersRoutes from "./routes/users.route.js"
import { connectDB } from "./utils/db.js"

const app = express()

app.use(cors()) // 1. CORS primero de todo
app.use(express.json())
app.use(morgan("dev"))

connectDB()

// Ruta de prueba para verificar CORS
app.get("/test-cors", (req, res) => res.json({ ok: true }))

app.use("/api", indexRoutes)
app.use("/api", loginRoutes)
app.use("/api", usersRoutes)

// Manejador de errores global para evitar crashes que rompan CORS
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Algo salió mal!' })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})