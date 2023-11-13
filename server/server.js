import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import SpecimenRouter from './routes/specimen.js';
import GenomicsRouter from './routes/genomics.js';


dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(cors())



app.get('/', (request, response) => {
  response.json({ info: 'Miller Lab Database' })
})

app.use('/specimen', SpecimenRouter)

app.use('/genomics', GenomicsRouter);


app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})