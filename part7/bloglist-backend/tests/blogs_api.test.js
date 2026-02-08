const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

describe('Blogs API tests', () => {
  let token = ''
  let userId = ''

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    // Create a test user
    const user = await api.post('/api/users').send({
      username: 'testuser',
      name: 'Test User',
      password: 'password123',
    })

    userId = user.body.id

    // Login to get token
    const loginRes = await api.post('/api/login').send({
      username: 'testuser',
      password: 'password123',
    })

    token = loginRes.body.token

    // Insert initial blogs with the user reference
    const blogsWithUser = helper.initialBlogs.map((blog) => ({
      ...blog,
      user: userId,
    }))
    await Blog.insertMany(blogsWithUser)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('the unique identifier property of the blog post is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      assert.ok(blog.id)
    })
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New Blog Post',
      author: 'Luis',
      url: 'http://luis.awesome.es',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map((b) => b.title)
    assert(contents.includes('New Blog Post'))
  })

  test('if the likes property is missing, it defaults to 0', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Jordi',
      url: 'http://jordi.testurl.com',
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const addedBlog = blogsAtEnd.find((b) => b.title === 'Blog without likes')
    assert.strictEqual(addedBlog.likes, 0)
  })

  test('create a blog with a missing title returns an error', async () => {
    const blogWithoutTitle = {
      author: 'Oscar',
      url: 'http://missing.title.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutTitle)
      .expect(400)
  })

  test('create a blog without url property returns an error', async () => {
    const blogWithoutUrl = {
      title: 'Blog without url',
      author: 'Oscar',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blogWithoutUrl)
      .expect(400)
  })

  test('adding a blog fails with status code 401 if token is not provided', async () => {
    const newBlog = {
      title: 'Blog without token',
      author: 'Anonymous',
      url: 'http://notoken.com',
      likes: 0,
    }

    await api.post('/api/blogs').send(newBlog).expect(401)
  })

  test('updates information of a single blog post', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedContent = {
      ...blogToUpdate,
      likes: 1001,
      url: 'XXXX',
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedContent)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id)

    assert.strictEqual(updatedBlog.likes, 1001)
    assert.strictEqual(updatedBlog.url, 'XXXX')
  })

  describe('deletion of a blog entry', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const ids = blogsAtEnd.map((b) => b.id)
      assert(!ids.includes(blogToDelete.id))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })
  })
})

describe('Blog Users tests', () => {
  test('users with password too short are not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: 'johndoe',
      name: 'John Doe',
      password: 'uh', // <-- too short
    }

    const result = await api.post('/api/users').send(invalidUser).expect(400)

    assert(result.body.error.includes('Password too short!'))

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('users with username too short are not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: 'jo', // <-- too short
      name: 'John Doe',
      password: 'XXXXX',
    }

    const result = await api.post('/api/users').send(invalidUser).expect(400)

    assert(
      result.body.error.includes('is shorter than the minimum allowed length'),
    )

    const usersAtEnd = await helper.usersInDb()

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
