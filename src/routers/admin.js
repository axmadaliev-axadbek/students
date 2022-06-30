import express from "express";
const router = express.Router()
import adminControllers from "../controllers/admin.js"
import checkToken from "../middleware/checkToken.js"

router.post('/addToGroup',  adminControllers.addToGroup)
router.post('/deleteFromGroup', adminControllers.deleteFromGroup)

export default router