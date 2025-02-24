import { Router } from "express"
import control from "./controllers/ShirtsController"
import cache from "./cache"

const router = Router()

router.get("/all-shirts", (req, res) => control.getAllShirts(req, res))
router.get("/", (req, res) => control.getShirtsByColors(req, res))
router.get("/material/:material", (req, res) =>
  control.getShirtsByMaterial(req, res)
)

router.get("/all-colors", async (req, res) => {
  const colors = await cache.getData("color")
  res.json(colors)
})

router.get("/all-materials", async (req, res) => {
  const materials = await cache.getData("material")
  res.json(materials)
})

router.get("/all-manufacturers", async (req, res) => {
  const manufacturers = await cache.getData("manufacturer")
  res.json(manufacturers)
})
router.get("/all-data", (req, res) => cache.getAllCacheData(req, res))

export default router

// getShirtsByColors: /?colors=white,gray
// getShirtsByMaterial: /material/viscose
