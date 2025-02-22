import express from "express"
import pg from "pg"
import dotenv from "dotenv"
import router from "./router"

dotenv.config()

const { Client } = pg
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

const PORT = 3000
const app = express()
app.use(express.json())

async function startApp() {
  try {
    await client.connect()

    app.listen(PORT, () => {
      console.log(`Server running on  http://localhost:${PORT}`)
    })
    app.use("/", router)
  } catch (error) {
    console.log(error)
  }
}

startApp()

export { PORT, app }
