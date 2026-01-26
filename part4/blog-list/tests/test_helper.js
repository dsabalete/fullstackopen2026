const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'Pepe',
        url: 'http://pepe.awesome.es',
        likes: 1000
    },
    {
        title: 'Javascript is cool',
        author: 'Juan',
        url: 'http://juan.awesome.es',
        likes: 500
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: 'willremovethissoon', author: 'Pepe', url: 'XXXXXx', likes: 0 })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}