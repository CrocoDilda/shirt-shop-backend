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
    try {
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
    } catch (error) {
      console.error("Error getting shirts by colors:", error)
      res.status(500).json({ error: "Error getting shirts by colors" })
    }
  }

  async getShirtsByMaterial(req: Request, res: Response) {
    try {
      const { material } = req.params
      const materialArr = String(material).split(",")
      if (!validateData(materialArr, cache.cache.material)) {
        res.status(400).json({ error: "Некорректные данные" })
      } else {
        await executeGet(req, res, Shirt, {
          where: { material: { [Op.in]: materialArr } },
        })
      }
    } catch (error) {
      console.error("Error getting shirts by material:", error)
      res.status(500).json({ error: "Error getting shirts by material" })
    }
  }

  async getShirtsByName(req: Request, res: Response) {
    try {
      const { name } = req.params
      await executeGet(req, res, Shirt, {
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      })
    } catch (error) {
      console.error("Error getting shirts by name:", error)
      res.status(500).json({ error: "Error getting shirts by name" })
    }
  }

  async getShirtById(req: Request, res: Response) {
    try {
      const { id } = req.params

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid shirt ID" })
      }

      await executeGet(req, res, Shirt, {
        where: { id: Number(id) },
      })
    } catch (error) {
      console.error("Error getting shirt by ID:", error)
      res.status(500).json({ error: "Error getting shirt by ID" })
    }
  }

  async filterShirts(req: Request, res: Response) {
    const {
      colors = cache.cache.color,
      materials = cache.cache.material,
      manufacturer = cache.cache.manufacturer,
      gender = "male,female",
      sortOrder = "asc",
    }: any = req.query

    let order: any = []
    if (sortOrder === "random") {
      order = Sequelize.literal("RANDOM()")
    } else {
      order = [["price", sortOrder]]
    }

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
        order: order,
      })
    } catch (error) {
      res.status(400).json({ error: "Некоректные данные" })
    }
  }
}

export default new shirtController()
