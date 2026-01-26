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

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter
