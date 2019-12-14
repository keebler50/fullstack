const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if ((body.title === undefined) || (body.url === undefined)) {
    return response.status(400).end()
  }

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: (body.likes) ? body.likes : 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
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
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(401).json({ error: 'blog missing' })
    }

    if (decodedToken.id.toString() !== blog.user.toString()) {
      return response.status(401).end()
    }

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
