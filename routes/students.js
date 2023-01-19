import express from 'express'
import { getStudent, getStudents, updateStudent, deleteStudent } from '../controllers/students.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.get('/', verifyToken, getStudents)
router.get('/:id', verifyToken, getStudent)
router.put('/:id', verifyToken, updateStudent)
router.delete('/:id', verifyToken, deleteStudent)

export default router