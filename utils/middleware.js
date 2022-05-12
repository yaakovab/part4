const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer')) {
        req.token = auth.substring(7)
    }

    next()
}

const userExtractor = async (req, res, next) => {
    const { token } = req
    // console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token invalid or missing' })
    }
    const user = await User.findById(decodedToken.id)
    console.log(user)
    if (user) {
        req.user = user
    } else {
        return res.status(401).json({ error: 'user not found' })
    }


    next()
}

const requestLogger = (req, res, next) => {
    logger.info('Method:', req.method)
    logger.info('Path:', req.path)
    logger.info('Body:', req.body)
    logger.info('---')

    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'ValidationError') {
        return res.status(400).send({ error: err.message })
    }
    else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    }

    next(err)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor,
}