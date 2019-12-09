const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    if ((body.username === undefined) || (body.password === undefined)) {
      response.status(400).json({ error: 'missing username and/or password' }).end()
      return
    } else if (body.username.length < 3 || body.password.length < 3) {
      response.status(400).json({ error: 'username and password must be at least 3 characters in length' }).end()
      return
    }

    const users = await User.find({})

    if (users.map(u => u.username).includes(body.username)) {
      response.status(400).json({ error: 'username already in use' }).end()
    } else {
      const saltRounds = 10
      const password = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        password
      })

      const savedUser = await user.save()
      response.json(savedUser.toJSON())
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
