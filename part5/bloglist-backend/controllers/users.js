const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user.js')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1, id: 1 })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    if (!password || password.length < 3) {
        console.log(`Password: '${password}'`)
        return response.status(400).json({ error: 'Password too short!' })
    }

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

module.exports = usersRouter