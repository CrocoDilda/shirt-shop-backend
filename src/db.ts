import { Sequelize } from "sequelize"
import dotenv from "dotenv"

// Загружаем переменные из .env
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "postgres", // Указываем, что это PostgreSQL
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // Для подключения через SSL, например, на Render
    },
  },
  logging: false, // Отключаем вывод логов запросов
})

export default sequelize
