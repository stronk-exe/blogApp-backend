import express from 'express'
import mongoose from 'mongoose'
import router from './routes/userRoutes'
import blogRouter from './routes/blogRoutes'

const app = express()
app.use(express.json())

app.use('/', router)
app.use('/', blogRouter)

mongoose.connect('mongodb+srv://admin:admin@cluster0.jppwko3.mongodb.net/?retryWrites=true&w=majority').then(()=> app.listen(3000)).then(()=>
    console.log('gg')
).catch((err)=> console.log(err))
