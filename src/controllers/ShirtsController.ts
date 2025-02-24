import { Request, Response } from "express"
import Shirt from "../models/Shirt"
import { validateData, executeQuery } from "../utils/utils"
import cache from "../cache"
import { Op, Sequelize } from "sequelize"

class PostController {
  async getAllShirts(req: Request, res: Response) {
    await executeQuery(req, res, Shirt)
  }

  async getShirtsByColors(req: Request, res: Response) {
    const { colors } = req.query
    const colorArr = String(colors)
      .split(",")
      .map((c) => c.trim())
    if (!validateData(colorArr, cache.cache.color)) {
      res.status(400).json({ error: "Некорректные данные" })
    } else {
      await executeQuery(req, res, Shirt, {
        where: Sequelize.literal(`color @> ARRAY['${colorArr.join("','")}']`),
      })
    }
  }

  async getShirtsByMaterial(req: Request, res: Response) {
    const { material } = req.params
    const materialArr = String(material).split(",")
    if (!validateData(materialArr, cache.cache.material)) {
      res.status(400).json({ error: "Некорректные данные" })
    } else {
      await executeQuery(req, res, Shirt, {
        where: { material: { [Op.in]: materialArr } },
      })
    }
  }
}

// Экспортируем сам экземпляр класса
export default new PostController()
