const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Getting Started with GraphQL',
    author: 'David Walsh',
    url: 'https://davidwalsh.name/getting-started-with-graphql',
    likes: 3
  },
  {
    title: 'How to Build and Deploy a Full-Stack React-App',
    author: 'Frank Zickert',
    url: 'https://medium.com/dailyjs/how-to-build-and-deploy-a-full-stack-react-app-4adc46607604',
    likes: 3
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}