import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import cors from 'cors'
import path from 'path'

import authRoutes from './routes/auth'
import postRoutes from './routes/posts'
const app = express()

app.use(cors())
app.use('/images', express.static(path.join(__dirname + '/../src/images')))
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/posts', postRoutes)
app.use(express.static(__dirname + '/../client/build'))
// app.use(express.static(__dirname))

mongoose
  .connect(config.get('mongoURI'), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const PORT = process.env.PORT || 5000

    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
  })
  .catch((err) => {
    console.log(err)
    console.log('Server not running - database error')
  })

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.sendfile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
    res.render('index')
  })
}
