import { Request, Response } from "express"
import pool from "../db" // Импорт соединения с БД
import { sqlQueries } from "../utils/queries"
import dotenv from "dotenv"
// import { validateColors } from "../utils/utils"
dotenv.config()

function validateColors(colors: string[], validColors: string[]): boolean {
  for (const color of colors) {
    if (!validColors.includes(color)) {
      return false // Возвращаем false, если найден некорректный цвет
    }
  }
  return true // Все цвета валидны
}

class PostController {
  // Универсальная функция для выполнения SQL-запросов
  async executeQuery(
    req: Request,
    res: Response,
    query: string,
    params: any[] = []
  ) {
    try {
      const { rows } = await pool.query(query, params)
      res.json(rows)
    } catch (error) {
      res.status(500).json({ error: "Ошибка при получении данных" })
    }
  }

  // Получить все рубашки
  async getAllShirts(req: Request, res: Response) {
    await this.executeQuery(req, res, sqlQueries.getAllShirts)
  }

  // Фильтрация рубашек по цвету
  async getShirtsByColors(req: Request, res: Response) {
    const { colors } = req.query
    const colorArr = String(colors).split(",")
    const validColors = ["white", "black", "gray"]

    validateColors(colorArr, validColors)

    await this.executeQuery(req, res, sqlQueries.getShirtsByColors, [colorArr])
  }

  // Фильтрация рубашек по материалу
  async getShirtsByMaterial(req: Request, res: Response) {
    const { material } = req.params
    await this.executeQuery(req, res, sqlQueries.getShirtsByMaterial, [
      material,
    ])
  }
}

// Экспортируем сам экземпляр класса
export default new PostController()
