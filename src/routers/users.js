import express from "express";
const router = express.Router()
import userControllers from "../controllers/users.js"
import checkToken from "../middleware/checkToken.js"

router.post('/students',  userControllers.REGISTER)
router.get('/students/:id', userControllers.GET)
router.get('/students', userControllers.GET)

export default router