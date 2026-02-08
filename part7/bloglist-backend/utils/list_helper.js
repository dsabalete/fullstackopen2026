const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  })
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const authorBlogCount = {}

  blogs.forEach((blog) => {
    authorBlogCount[blog.author] = (authorBlogCount[blog.author] || 0) + 1
  })

  let maxBlogs = 0
  let prolificAuthor = null

  for (const author in authorBlogCount) {
    if (authorBlogCount[author] > maxBlogs) {
      maxBlogs = authorBlogCount[author]
      prolificAuthor = author
    }
  }

  return { author: prolificAuthor, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }

  const authorLikeCount = {}

  blogs.forEach((blog) => {
    authorLikeCount[blog.author] =
      (authorLikeCount[blog.author] || 0) + blog.likes
  })

  let maxLikes = 0
  let mostLikedAuthor = null

  for (const author in authorLikeCount) {
    if (authorLikeCount[author] > maxLikes) {
      maxLikes = authorLikeCount[author]
      mostLikedAuthor = author
    }
  }

  return { author: mostLikedAuthor, likes: maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
