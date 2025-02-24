import { Response, Request } from "express"
import Shirt from "./models/Shirt"

interface CacheData {
  [key: string]: string[] // Кеш для каждого поля
}

let cache: CacheData = {}

const getData = async (field: string): Promise<string[]> => {
  try {
    const shirts = await Shirt.findAll({
      attributes: [field],
    })

    const allValues: string[] = []
    shirts.forEach((shirt) => {
      const value = shirt.get(field) as string | string[] // Получаем значение для заданного поля
      if (value) {
        if (Array.isArray(value)) {
          allValues.push(...value) // Если это массив (например, для цвета), добавляем все значения
        } else {
          allValues.push(value) // Если это просто строка (например, для материала)
        }
      }
    })

    const uniqueValues = [...new Set(allValues)] // Уникальные значения для поля
    cache[field] = uniqueValues // Обновляем кэш

    return uniqueValues // Возвращаем уникальные значения
  } catch (error) {
    console.error(`Ошибка при обновлении кеша для поля ${field}:`, error)
    return [] // Если ошибка, возвращаем пустой массив
  }
}

const getAllCacheData = async (req: Request, res: Response) => {
  try {
    // Получаем все данные из кэша или обновляем, если их нет
    const colors = cache.color || (await getData("color"))
    const materials = cache.material || (await getData("material"))
    const manufacturers = cache.manufacturer || (await getData("manufacturer"))

    // Отправляем всё сразу
    res.json({
      colors,
      materials,
      manufacturers,
    })
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении данных" })
  }
}

// Обновляем кеш каждые 60 минут
setInterval(() => {
  const fields = ["color", "material", "manufacturer"] // Перечень полей для кеширования
  fields.forEach((field) => {
    getData(field) // Запрос данных и обновление кеша
  })
}, 60 * 60 * 1000)

export default { getData, getAllCacheData, cache }
