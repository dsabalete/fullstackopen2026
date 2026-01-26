const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('Blogs API tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
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
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(b => b.title)
        assert(contents.includes('New Blog Post'))
    })


    after(async () => {
        await mongoose.connection.close()
    })
})