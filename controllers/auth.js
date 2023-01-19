import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Student from '../models/Student.js'

export const register = async (req, res) => {
    try { 
        const { firstName, lastName, address, email, password} = req.body
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(password, salt)
        const newStudent = await Student.create({
            firstName,
            lastName,
            address,
            email,
            password: encryptedPassword
        })
        const savedStudent = await newStudent.save()
        res.status(201).json(savedStudent)
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        
        const student = await Student.findOne({
          email: email
        })
        
        if (!student) return res.status(400).json({msg: 'invalid email/password'})
        
        const isPasswordValid = await bcryptjs.compare(password, student.password)
        
        if (isPasswordValid) {
            const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET)
            student.password = '***'
            res.status(200).json({token, student})
        } else {
            res.status(400).json({msg: 'invalid credentials'})
        }
    } catch (error) {
        res.status(500).json({ error: err.message })
    }
}
