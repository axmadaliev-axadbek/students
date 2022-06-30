import express from "express";
const router = express.Router()
import dataControllers from '../controllers/data.js'


router.get('/data', dataControllers.GET)
router.get('/data/:id', dataControllers.GET)


export default router