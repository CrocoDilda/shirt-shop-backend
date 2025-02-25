import { Request, Response } from "express"
import Shirt from "../models/Shirt"
import { validateData, executeGet } from "../utils/utils"
import cache from "../cache"
import { Op, Sequelize } from "sequelize"

class shirtController {
  async getAllShirts(req: Request, res: Response) {
    await executeGet(req, res, Shirt)
  }

  async getShirtsByColors(req: Request, res: Response) {
    const { colors } = req.query
    const colorArr = String(colors)
      .split(",")
      .map((c) => c.trim())
    if (!validateData(colorArr, cache.cache.color)) {
      res.status(400).json({ error: "Некорректные данные" })
    } else {
      await executeGet(req, res, Shirt, {
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
      await executeGet(req, res, Shirt, {
        where: { material: { [Op.in]: materialArr } },
      })
    }
  }
}

export default new shirtController()
