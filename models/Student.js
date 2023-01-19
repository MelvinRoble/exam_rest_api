import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema(
    {
         firstName: { type: String, required: true },
         lastName: { type: String, required: true},
         address: { type: String, required: true},
         email: { type: String, required: true, unique: true },
         password: { type: String, required: true}
    },
    { timestamps: true }
)

const Student = mongoose.model('Student', StudentSchema)
export default Student
