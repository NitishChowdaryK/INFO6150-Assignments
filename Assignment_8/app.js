require('dotenv').config()

const express = require('express')
const cors = require('cors')
const path = require('path')

const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const jobRoutes = require('./routes/jobRoutes')
const { swaggerUi, specs } = require('./swagger/swagger')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/user', userRoutes)
app.use('/', jobRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Assignment 10 API running successfully',
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
