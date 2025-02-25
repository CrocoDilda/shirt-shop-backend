import { Request, Response } from "express"
import User from "../models/User"
import Confirmation from "../models/Confirmation"
import mail from "../mail/mail"

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

const answers = {
  invalidEmail: "Введите корректный email",
  busuEmail: "Пользователь с таким email уже существует",
  codeSent: "Код подтверждения отправлен",
  creationError: "Не удалось создать запись с кодом",
  registError: "Произошла ошибка при регистрации: ",
}

class ConfirmationController {
  async confirmedEmail(req: Request, res: Response) {
    const { email } = req.body
    console.log("Email is: " + email)
    if (!isValidEmail(email)) {
      res.status(400).json({ error: answers.invalidEmail })
    } else {
      try {
        // Удаляем прошлые записи этого мыла, если они есть
        await Confirmation.destroy({
          where: {
            email: email,
          },
        })

        const user = await User.findOne({ where: { email } })
        if (user) {
          res.status(400).json({ error: answers.busuEmail })
        } else {
          const code = Math.trunc(Math.random() * (99999 - 10000) + 10000)
          const expiresAt = new Date(new Date().getTime() + 10 * 60000)
          const confirmation = await Confirmation.create({
            email,
            code: code,
            confirmed: false,
            expires_at: expiresAt, // Передаём дату истечения действия
          })

          // Проверяем, что объект был создан
          if (confirmation) {
            res.status(200).json({
              message: answers.codeSent,
              code: confirmation.code,
            })
            mail.sendEmail(
              email,
              "Подтверждение регистрации",
              confirmation.code
            )
          } else {
            res.status(500).json({ error: answers.creationError })
          }
        }
      } catch (error) {
        console.error(answers.registError, error)
        return res.status(500).json({ error: answers.registError })
      }
    }
  }
}

export default new ConfirmationController()
