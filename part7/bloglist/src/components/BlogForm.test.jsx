import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls event handler with right details when a new blog is created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByLabelText(/title/i)
    const authorInput = screen.getByLabelText(/author/i)
    const urlInput = screen.getByLabelText(/url/i)
    const createButton = screen.getByRole('button', { name: /create blog/i })

    await user.type(titleInput, 'New blog title')
    await user.type(authorInput, 'New Author')
    await user.type(urlInput, 'http://newblog.example')
    await user.click(createButton)

    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New blog title',
        author: 'New Author',
        url: 'http://newblog.example',
      }),
    )
  })
})
