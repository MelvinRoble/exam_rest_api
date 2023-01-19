import Student from '../models/Student.js'
import bcryptjs from 'bcryptjs'

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find()
        if (students.length !==0)
            res.status(200).json(students)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getStudent = async (req, res) => {
    try {
        const { id } = req.params
        const student = await Student.findById(id)
        if (student)
            res.status(200).json(student)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

export const deleteStudent = async (req, res) => {
    try {
        await Student.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateStudent = async (req, res) => {
    try {
        const filter = {_id: req.params.id }
        const { firstName, lastName, address, email, password } = req.body
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(password, salt)
        
        const update = {
            firstName,
            lastName,
            address,
            email,
            password: encryptedPassword
        }
      
        await Student.findOneAndUpdate(filter. update)
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}
