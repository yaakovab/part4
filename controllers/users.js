const bcrypt = require('bcrypt');
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    if (!username || !password) {
        return res.status(400)
            .json({ error: 'username or password are missing' })
    }
    if (username.length < 3 || password.length < 3) {
        return res.status(400).json({ error: 'username or password are too short' })
    }

    const usernameExist = await User.findOne({ username })
    if (usernameExist) {
        return res.status(400).json({ error: 'username already exists' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username, name, passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})


module.exports = usersRouter