import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog /> when user is the creator of the blog entry', () => {
  test('renders the blog title and author', async () => {
    const mockHandler = vi.fn()

    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'authortest',
      url: 'urltest',
      likes: 5,
      user: { name: 'usertest', username: 'usernametest' },
    }

    localStorage.setItem(
      'loggedBlogAppUser',
      JSON.stringify({ username: 'usernametest' }),
    )

    const { container } = render(
      <Blog blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} />,
    )

    const titleEl = container.querySelector('.blog-title')
    const authorEl = container.querySelector('.blog-author')

    expect(titleEl).toBeDefined()
    expect(titleEl).toHaveTextContent(blog.title)
    expect(authorEl).toBeDefined()
    expect(authorEl).toHaveTextContent(blog.author)
  })

  test('by default shows title and author but not url or likes', async () => {
    const mockHandler = vi.fn()

    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'authortest',
      url: 'urltest',
      likes: 5,
      user: { name: 'usertest', username: 'usernametest' },
    }

    // mock logged in user in localStorage so Blog can determine creator
    localStorage.setItem(
      'loggedBlogAppUser',
      JSON.stringify({ username: 'usernametest' }),
    )

    const { container } = render(
      <Blog blog={blog} updateBlog={mockHandler} removeBlog={mockHandler} />,
    )

    // Title and author should be visible
    const titleEl = container.querySelector('.blog-title')
    const authorEl = container.querySelector('.blog-author')
    expect(titleEl).toBeDefined()
    expect(titleEl).toBeVisible()
    expect(authorEl).toBeDefined()
    expect(authorEl).toBeVisible()

    // URL and likes should NOT be visible by default
    const urlEl = container.querySelector('.blog-url')
    const likesEl = container.querySelector('.blog-likes')
    expect(urlEl).toBeDefined()
    expect(urlEl).not.toBeVisible()
    expect(likesEl).toBeDefined()
    expect(likesEl).not.toBeVisible()
  })
})
