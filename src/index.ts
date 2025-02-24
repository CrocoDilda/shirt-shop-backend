import express from "express"
import pg from "pg"
import dotenv from "dotenv"
import router from "./router"
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
    app.use("/", router)
    initializeCache()
  } catch (error) {
    console.log(error)
  }
}

startApp()

export { PORT, app }
