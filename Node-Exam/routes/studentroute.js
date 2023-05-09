import express from "express";
import Student from '../controller/student.js';
import auth from '../middleware/auth.js'
const router=express.Router()

router.get('/get',Student.getStudent)
router.post('/register',Student.register)
router.post('/login',Student.login)
router.get('/student',auth,Student.oneStudent)
router.post('/update',auth,Student.UpdateStudent)
export default router;
