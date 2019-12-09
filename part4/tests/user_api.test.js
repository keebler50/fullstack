const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  let userObject = new User(helper.initialUsers[0])
  await userObject.save()

  userObject = new User(helper.initialUsers[1])
  await userObject.save()
})

describe('when saving new users', () => {
  test('verify new users with username < 3 characters are not added', async () => {
    const newUser = {
      username: 'jo',
      password: 'password1',
      name: 'Joseph Douglas'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('username and password must be at least 3 characters in length')
  })

  test('verify new users with password < 3 characters are not added', async () => {
    const newUser = {
      username: 'jdouglas',
      password: 'pa',
      name: 'Joseph Douglas'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('username and password must be at least 3 characters in length')
  })

  test('verify new users without a defined username are not added', async () => {
    const newUser = {
      // username: 'jdouglas',
      password: 'pa',
      name: 'Joseph Douglas'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('missing username and/or password')
  })

  test('verify new users without a defined password are not added', async () => {
    const newUser = {
      username: 'jdouglas',
      // password: 'pa',
      name: 'Joseph Douglas'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('missing username and/or password')
  })

  test('verify new users with existing username are not added', async () => {
    const newUser = {
      username: helper.initialUsers[0].username,
      password: 'password2',
      name: 'Jack Diaz'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('username already in use')
  })
})

test('artifical await', async () => {
  // the following await statement prevents jest from throwing the following error:
  //    "Jest has detected the following 1 open handle potentially keeping Jest from exiting"
  // https://github.com/visionmedia/supertest/issues/520
  await new Promise(resolve => setTimeout(resolve, 2000))

  expect(2).toBe(2)
})

afterAll(() => {
  mongoose.connection.close()
})
