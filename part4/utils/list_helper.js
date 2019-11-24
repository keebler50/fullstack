const array = require('lodash/array')
const coll = require('lodash/collection');

const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  return blogs.map(b => {
    if (b.likes && typeof b.likes === 'number') return b.likes
    return 0
  }).reduce((acc, cur) => acc + cur)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  blogs.sort((a, b) => {
    return a.likes < b.likes
  })

  return {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const uniques = array.uniq(blogs.map(b => b.author))
  const grouped = coll.groupBy(blogs, 'author')

  const bca = uniques.map(u => {
    const bc = {}
    bc.author = u
    bc.blogs = grouped[u].length
    return bc
  }).sort((a, b) => a.blogs < b.blogs)

  return bca[0]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const uniques = array.uniq(blogs.map(b => b.author))
  const grouped = coll.groupBy(blogs, 'author')

  const bca = uniques.map(u => {
    const bc = {}
    bc.author = u
    bc.likes = grouped[u].map(g => g.likes).reduce((acc, cur) => acc + cur)
    return bc
  }).sort((a, b) => a.likes < b.likes)

  return bca[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
