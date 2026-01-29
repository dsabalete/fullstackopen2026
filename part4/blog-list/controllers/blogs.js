const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

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

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes
    //blog.user = user

    const updatedBlog = await blog.save()
    response.json(updatedBlog)
})

module.exports = blogsRouter
