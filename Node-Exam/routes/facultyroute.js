import express from "express";
import faculty from "../controller/faculty.js";
import auth from '../middleware/auth.js'
const router=express.Router()


router.post('/login',faculty.login)
router.post('/addfine',auth,faculty.addFine)
router.get('/payment',faculty.viewmypayment)
router.post('/bulkfine',auth,faculty.bulkfine)
router.post('/update',auth,faculty.Update)


export default router;