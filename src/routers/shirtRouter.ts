import { Router } from "express"
import control from "../controllers/shirtController"
import cache from "../cache"

const router = Router()

router.get("/all", (req, res) => control.getAllShirts(req, res))
router.get("/", (req, res) => control.getShirtsByColors(req, res))
router.get("/material/:material", (req, res) =>
  control.getShirtsByMaterial(req, res)
)
router.get("/name/:name", (req, res) => control.getShirtsByName(req, res))
router.get("/filter", control.filterShirts)

router.get("/colors", async (req, res) => {
  const colors = await cache.getData("color")
  res.json(colors)
})

router.get("/id/:id", async (req, res) => {
  await control.getShirtById(req, res)
})

router.get("/materials", async (req, res) => {
  const materials = await cache.getData("material")
  res.json(materials)
})

router.get("/manufacturers", async (req, res) => {
  const manufacturers = await cache.getData("manufacturer")
  res.json(manufacturers)
})

router.get("/filter-options", (req, res) => cache.getAllCacheData(req, res))

export default router

// getShirtsByColors: /?colors=white,gray
// getShirtsByMaterial: /material/viscose
