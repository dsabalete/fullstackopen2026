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

    test('if the likes property is missing, it defaults to 0', async () => {
        const newBlog = {
            title: 'Blog without likes',
            author: 'Jordi',
            url: 'http://jordi.testurl.com'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const addedBlog = blogsAtEnd.find(b => b.title === 'Blog without likes')
        assert.strictEqual(addedBlog.likes, 0)
    })

    test('create a blog with a missing title returns an error', async () => {
        const blogWithoutTitle = {
            author: 'Oscar',
            url: 'http://missing.title.com',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400)
    })

    test('create a blog without url property returns an error', async () => {
        const blogWithoutUrl = {
            title: 'Blog without url',
            author: 'Oscar',
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(blogWithoutUrl)
            .expect(400)
    })

    after(async () => {
        await mongoose.connection.close()
    })
})