const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithNoBlogs = []
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
    },
  ]
  const listWithMultipleBlogs = [
    {
      title: 'Blog One',
      author: 'Test Author',
      url: 'XXXXXXXXXXXXXXXXXX',
      likes: 5,
    },
    {
      title: 'Blog Two',
      author: 'Test Author',
      url: 'XXXXXXXXXXXXXXXXXX',
      likes: 10,
    },
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(listWithNoBlogs)
    assert.strictEqual(result, 0)
  })

  test('of a list with one blog equals the likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('of a list with multiple blogs is calculated correctly', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 15)
  })
})
