import express, { Request, Response } from "express"
import control from "../controllers/confirmationController"

const router = express.Router()

router.post("/email", async (req: Request, res: Response) => {
  await control.confirmedEmail(req, res)
})

export default router
