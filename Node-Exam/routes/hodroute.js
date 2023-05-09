import express from "express";
import hod from "../controller/hod.js";
// import auth from '../middleware/auth.js'
const router=express.Router()

router.post('/register',hod.register)
router.post('/createfund',hod.createFund)

export default router;