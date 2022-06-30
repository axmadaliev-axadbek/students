import express from "express";
const router = express.Router()
import groupsControllers from '../controllers/groups.js'


router.get('/groups', groupsControllers.GET)
router.get('/groups/:id', groupsControllers.GET)

router.post('/groups',  groupsControllers.POST)
router.delete('/groups/:id',  groupsControllers.DELETE)

export default router