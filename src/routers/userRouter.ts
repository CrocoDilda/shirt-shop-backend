import { Router } from "express"
import control from "../controllers/userController"

const router = Router()

router.get("/:id", (req, res) => control.getUsers(req, res))
router.post("/register", async (req, res) => {
  try {
    await control.registerUser(req, res)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Ошибка при регистрации" })
  }
})

export default router
