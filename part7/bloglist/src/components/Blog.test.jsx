import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Blog from './Blog'

describe('<Blog />', () => {
  test('renders title and author', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'authortest',
      url: 'urltest',
      likes: 5,
      id: 'blogid123',
      user: { name: 'usertest', username: 'usernametest' },
    }

    render(
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>
    )

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()

    // Check for link
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/blogs/${blog.id}`)
  })
})
