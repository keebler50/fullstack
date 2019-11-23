const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0
  return blogs.map(b => {
    if (b.likes && typeof b.likes === 'number') return b.likes
    return 0
  }).reduce((acc, curr) => acc + curr)
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
