import { Pool } from "pg"
import dotenv from "dotenv"

// Загружаем переменные из .env
dotenv.config()

// Создаём пул подключений к БД
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Для подключения к Render или другим облачным сервисам
  },
})

export default pool
