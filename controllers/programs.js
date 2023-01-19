import Program from '../models/Program.js'

export const getPrograms = async (req, res) => {
    try {
        const programs = await Program.find()
        if (programs.length !==0)
            res.status(200).json(programs)
        else
            res.status(204).send()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getProgram = async (req, res) => {
    try {
        const { id } = req.params
        const program = await Program.findById(id)
        if (program)
            res.status(200).json(program)
        else
            res.status(404).json({ error: 'resource not found' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const addProgram = async (req, res) => {
    try {
        const { progName, course } = req.body
        const newProgram = await Program.create({
          progName,
          course
        })
        const savedProgram = await newProgram.save()
        res.status(201).json({ id: savedProgram._id})
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteProgram = async (req, res) => {
    try {
        await Program.deleteOne({_id: req.params.id })
        res.status(204).send()
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
}

export const updateProgram = async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const { progName, course } = req.body
        const update = {
            progName: progName,
            course: course
        }
      
        await Program.findOneAndUpdate(filter, update)
        res.status(204).send()
    } catch (err) {
      console.log(err)
      res.status(404).json({ error: err.message })
    }
}
