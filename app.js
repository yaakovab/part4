
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


const url = config.MONGODB_URI

logger.info('connectint to', url)

mongoose.connect(url)
    .then(result => {
        logger.info('connected to', url)
    })
    .catch(error => {
        logger.error('error connectint to MongoDB:', error.massage)
    })


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


