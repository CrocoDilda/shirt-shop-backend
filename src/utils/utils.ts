import { Request, Response } from "express"

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

// Универсальная функция для выполнения SQL-запросов
export async function executeQuery(
  req: Request,
  res: Response,
  model: any,
  options: object = {}
) {
  try {
    const result = await model.findAll(options)
    res.json(result)
  } catch (error) {
    console.log("Error executing query:", error)
    res.status(500).json({ error: "Ошибка при получении данных" })
  }
}
