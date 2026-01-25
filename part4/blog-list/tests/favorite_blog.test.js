const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe("favorite blog", () => {
    test("return null when list is empty", () => {
        const result = listHelper.favoriteBlog([])
        assert.strictEqual(result, null)
    })

    test("return the blog with most likes", () => {
        const blogs = [
            {
                title: "Blog One",
                author: "Test Author",
                url: "XXXXXXXXXXXXXXXXXX",
                likes: 5
            },
            {
                title: "Blog Two",
                author: "Test Author 2",
                url: "XXXXXXXXXXXXXXXXXX",
                likes: 10
            },
            {
                title: "Blog Three",
                author: "Test Author 3",
                url: "ZZZZZZZZZZZZZZZZZZZZ",
                likes: 7
            }
        ]
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[1])
    })
})