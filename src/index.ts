import express from "express"
import pg from "pg"
import dotenv from "dotenv"
import shirtRouter from "./routers/shirtRouter"
import userRouter from "./routers/userRouter"
import confirmationRouter from "./routers/confirmationRouter"
import mail from "./mail/mail"

import cache from "./cache"

dotenv.config()

const { Client } = pg
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

const initializeCache = async () => {
  await Promise.all([
    cache.getData("color"),
    cache.getData("material"),
    cache.getData("manufacturer"),
  ])

  console.log("Cache initialized")
}

const PORT = 3000
const app = express()
app.use(express.json())

async function startApp() {
  try {
    await client.connect()
    app.listen(PORT, () => {
      console.log(`Server running on  http://localhost:${PORT}`)
    })
    app.use("/shirts", shirtRouter)
    app.use("/users", userRouter)
    app.use("/confirmation", confirmationRouter)

    initializeCache()
  } catch (error) {
    console.log(error)
  }
}

startApp()

export { PORT, app }
