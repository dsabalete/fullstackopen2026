const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
    test('of empty list is null', () => {
        const result = listHelper.mostBlogs([])
        assert.strictEqual(result, null)
    })

    test('when list has only one blog, return the author of that blog', () => {
        const blogs = [
            {
                title: "Single Blog",
                author: "Single Author",
                url: "XXXXXXXXXXXXXXXXXXXXXXXX",
                likes: 5
            }
        ]
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: "Single Author", blogs: 1 })
    })

    test('of a bigger list is calculated right', () => {
        const blogs = [
            {
                title: "Blog One",
                author: "Author One",
                url: "XXXXXXXXXXXXXXXXXXXXXXXX",
                likes: 5
            },
            {
                title: "Blog Two",
                author: "Author Two",
                url: "XXXXXXXXXXXXXXXXXXXXXXXX",
                likes: 10
            },
            {
                title: "Blog Three",
                author: "Author One",
                url: "XXXXXXXXXXXXXXXXXXXXXXXX",
                likes: 15
            },
            {
                title: "Blog Four",
                author: "Author Three",
                url: "XXXXXXXXXXXXXXXXXXXXXXXX",
                likes: 20
            }
        ]
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, { author: "Author One", blogs: 2 })
    })
})