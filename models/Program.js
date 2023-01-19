import mongoose from 'mongoose'

const ProgramSchema = new mongoose.Schema(
    {
        progName: { type: String, required: true },
        course: { type: String, required: true}
    },
    { timestamps: true }
)

const Program = mongoose.model('Program', ProgramSchema)
export default Program
