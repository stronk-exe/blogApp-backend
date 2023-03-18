import express from 'express'
import mongoose from 'mongoose'
import router from './routes/userRoutes'

const app = express()
app.use('/', router)

mongoose.connect('mongodb+srv://admin:admin@cluster0.jppwko3.mongodb.net/?retryWrites=true&w=majority').then(()=> app.listen(3000)).then(()=>
    console.log('gg')
).catch((err)=> console.log(err))

// app.use('/', (req, res, next) => {
//     res.send('hello')
// })

// app.listen(3000, () => {
//     console.log('port')
// })