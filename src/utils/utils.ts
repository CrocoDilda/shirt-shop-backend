function validateColors(colors: string[], validColors: string[]): boolean {
  for (const color of colors) {
    if (!validColors.includes(color)) {
      return false // Возвращаем false, если найден некорректный цвет
    }
  }
  return true // Все цвета валидны
}

export default { validateColors }
