import express from 'express' 
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import studentRoutes from './routes/students.js'
import programRoutes from './routes/programs.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

/*routes*/
app.use('/auth', authRoutes)
app.use('/students', studentRoutes)
app.use('/programs', programRoutes)

/*connect to database*/
const PORT = process.env.PORT || 3001
mongoose.connect(process.env.MONGO_URL, {
    dbName: 'student_class'
})
.then(() => app.listen(PORT, () => console.log('Server listening on ${PORT}')))
.catch((error) => console.log('${error} did not connect'))
