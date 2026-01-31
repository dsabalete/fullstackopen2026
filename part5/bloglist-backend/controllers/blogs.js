const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const { userExtractor } = require('../utils/middleware.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    if (!user) {
        return response.status(400).json({ error: 'user missing or not valid' })
    }

    const blog = new Blog({
        ...body,
        likes: body.likes || 0,
        user: user._id,
    })

    if (!blog.title || !blog.url) {
        return response.status(400).end()
    }

    const blogSaved = await blog.save()
    user.blogs = user.blogs.concat(blogSaved._id)
    await user.save()

    response.status(201).json(blogSaved)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
    }

    const user = request.user
    if (!user) {
        return response.status(401).json({ error: 'user not found' })
    }

    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).json({ error: 'blog not found' })
    }

    if (blog.user.toString() !== user.id.toString()) {
        return response.status(403).json({ error: 'unauthorized' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes, user } = request.body
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).end()
    }
    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes
    blog.user = user.id

    const updatedBlog = await blog.save()
    response.json(updatedBlog)
})

module.exports = blogsRouter
