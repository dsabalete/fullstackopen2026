const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog({
        ...request.body,
        likes: request.body.likes || 0
    })

    if (!blog.title || !blog.url) {
        return response.status(400).end()
    }

    const blogSaved = await blog.save()
    response.status(201).json(blogSaved)
})

module.exports = blogsRouter
