const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const apiRouter = require('./routes/api.routes')

// Create the server
const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: '*' }))

// Routes
app.use('/api', apiRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`)
})
