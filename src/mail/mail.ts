import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { returnHTML } from "./htmlSample"

dotenv.config()

class mail {
  async sendEmail(to: string, subject: string, code: number) {
    const transporter = nodemailer.createTransport({
      host: "smtp.yandex.ru",
      port: 465, // 465 - защищенный, 587 - незащищенный
      secure: true, // true для 465, false для 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    try {
      const info = await transporter.sendMail({
        from: `"Shirt shop" <${process.env.EMAIL_USER}>`, // От кого
        to,
        subject, // Тема письма
        html: returnHTML(code),
      })

      console.log("Email sent:", info.messageId)
    } catch (error) {
      console.error("Error sending email:", error)
    }
  }
}

export default new mail()
