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

module.exports = {
  dummy,
  totalLikes
}
