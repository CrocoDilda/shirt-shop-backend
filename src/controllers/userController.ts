import { Request, Response } from "express"
import User from "../models/User"
import { executeGet } from "../utils/utils"
import { Op, FindOptions } from "sequelize"
import bcrypt from "bcryptjs"
import { executePost } from "../utils/utils"

class userController {
  async getUsers(req: Request, res: Response) {
    const userId = req.params.id
    const options: FindOptions = {
      where: {
        id: { [Op.eq]: userId },
      },
    }

    await executeGet(req, res, User, options)
  }

  async registerUser(req: Request, res: Response) {
    const { name, email, password, avatar_icon } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Пожалуйста, заполните все поля" })
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const userData = {
        name,
        email,
        password_hash: hashedPassword,
        avatar_icon,
      }

      await executePost(req, res, User, userData, true)
    } catch (error) {
      console.log("Error during registration:", error)
      res.status(500).json({ error: "Ошибка при регистрации пользователя" })
    }
  }
}

export default new userController()
