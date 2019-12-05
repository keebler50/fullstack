const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('verify the unique identifier property of the blog posts is named id', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)

  expect(resultBlog.body.id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'A Hole New Blog',
    author: 'Roger Dodger',
    url: 'https://roger.dodger/a-hole-new-blog',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain('A Hole New Blog')
})

test('missing likes property defaults to 0', async () => {
  const newBlog = {
    title: 'A Hole New Blog',
    author: 'Roger Dodger',
    url: 'https://roger.dodger/a-hole-new-blog'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const initialTitles = helper.initialBlogs.map(b => b.title)

  const newBlogFromDb = blogsAtEnd.filter(n => initialTitles.indexOf(n.title) === -1)

  expect(newBlogFromDb.length).toBe(1)

  expect(newBlogFromDb[0].likes).toBe(0)
})

test('missing title & url properties response is 400', async () => {
  const newBlog = {
    author: 'Roger Dodger',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})
