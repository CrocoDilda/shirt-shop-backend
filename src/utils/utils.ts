import { Request, response, Response } from "express"
import { Model, FindOptions } from "sequelize"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const JWT_SECRET = String(process.env.JWT_SECRET)

export function validateData(request: string[], sample: string[]): boolean {
  const normalizedRequest = request.map((item) => item.trim().toLowerCase())
  const normalizedSample = sample.map((item) => item.trim().toLowerCase())

  for (const color of normalizedRequest) {
    if (!normalizedSample.includes(color)) {
      return false
    }
  }
  return true
}

function generateToken(
  refresh: boolean,
  data: { id: string; name: string; avatar_icon: string }
): string {
  return jwt.sign(
    { id: data.id, name: data.name, avatar_icon: data.avatar_icon },
    JWT_SECRET,
    { expiresIn: refresh ? "30d" : "2h" } // Время действия токена, например, 1 час
  )
}

function newUserResponse(result: any) {
  return {
    accessToken: generateToken(false, result),
    refreshToken: generateToken(true, result),
    name: result.name,
    avatar_icon: result.avatar_icon,
  }
}

// Универсальная функция для выполнения SQL-запросов
export async function executeGet<T extends Model>(
  req: Request,
  res: Response,
  model: { new (): T } & typeof Model,
  options: FindOptions = {}
) {
  try {
    const result = await model.findAll(options)
    res.json(result)
  } catch (error) {
    console.log("Error executing query:", error)
    res.status(500).json({ error: "Ошибка при получении данных" })
  }
}

export async function executePost<T extends Model>(
  req: Request,
  res: Response,
  model: { new (): T } & typeof Model,
  data: object,
  createUser?: boolean
) {
  try {
    const result = await model.create(data)
    res.status(201).json(createUser ? newUserResponse(result) : result)
  } catch (error: any) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res
        .status(400)
        .json({ error: "Пользователь с таким email уже существует" })
    } else if (error.name === "SequelizeValidationError") {
      res.status(400).json({ error: "Некорректные данные" })
    } else {
      res
        .status(500)
        .json({ error: "Ошибка при получении данных", details: error.message })
    }
  }
}

const num = Math.trunc(Math.random() * (99999 - 10000) + 10000)
