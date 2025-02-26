import { Request, Response } from "express"
import Shirt from "../models/Shirt"
import { validateData, executeGet } from "../utils/utils"
import cache from "../cache"
import { Op, Sequelize, FindOptions } from "sequelize"

class shirtController {
  async getAllShirts(req: Request, res: Response) {
    const options: FindOptions = {
      order: [[Sequelize.fn("RANDOM"), "ASC"]],
    } // Добавляем рандомайзер

    await executeGet(req, res, Shirt, options)
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

  async filterShirts(req: Request, res: Response) {
    const {
      colors = cache.cache.color,
      materials = cache.cache.materials,
      manufacturer = cache.cache.manufacturers,
      gender = "male,female",
      sortOrder = "asc",
    }: any = req.query

    try {
      const colorArr = String(colors)
        .split(",")
        .map((c) => c.trim())
      const materialArr = String(materials).split(",")
      const manufacturerArr = String(manufacturer).split(",")
      const genderArr = String(gender).split(",")
      await executeGet(req, res, Shirt, {
        where: {
          color: Sequelize.literal(
            `color && ARRAY['${colorArr.join("','")}']::text[]`
          ),
          material: { [Op.in]: materialArr },
          manufacturer: { [Op.in]: manufacturerArr },
          gender: { [Op.in]: genderArr },
        },
        order: [["price", sortOrder]],
      })
    } catch (error) {
      res.status(400).json({ error: "Некоректные данные" })
    }
  }
}

export default new shirtController()
