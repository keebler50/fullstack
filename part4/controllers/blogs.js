const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  // const user = await User.findById(body.userId)
  const user = await User.find({})

  if ((body.title === undefined) || (body.url === undefined)) {
    response.status(400).end()
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: (body.likes) ? body.likes : 0,
      user: user[0]._id
    })

    try {
      const savedBlog = await blog.save()
      user[0].blogs = user[0].blogs.concat(savedBlog._id)
      await user[0].save()
      response.json(savedBlog.toJSON())
    } catch (exception) {
      next(exception)
    }
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  if (body.title === undefined) {
    return response.status(400).json({ error: 'title missing' })
  }

  if (body.author === undefined) {
    return response.status(400).json({ error: 'author missing' })
  }

  if (body.url === undefined) {
    return response.status(400).json({ error: 'url missing' })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: (body.likes) ? body.likes : 0
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, blog)
    response.status(200).end()
  } catch (exception) {
    console.log(exception)
    next(exception)
  }
})

module.exports = blogsRouter
