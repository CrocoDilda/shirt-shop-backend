import { Router } from "express"
import PostController from "./controllers/ShirtsController"

const router = Router()

router.post("/user")
router.get("/shirts", (req, res) => PostController.getAllShirts(req, res))
// /shirts/colors?colors=white,gray
router.get("/shirts/colors", (req, res) =>
  PostController.getShirtsByColors(req, res)
)
// /shirts/material/viscose
router.get("/shirts/material/:material", (req, res) =>
  PostController.getShirtsByMaterial(req, res)
)

export default router
