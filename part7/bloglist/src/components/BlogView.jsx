import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import CommentForm from './CommentForm.jsx'

const BlogView = ({ updateBlog, removeBlog, username }) => {
  const { id } = useParams()

  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  if (isLoading) {
    return <div>Loading blog...</div>
  }

  if (isError) {
    return <div>Error loading blog</div>
  }

  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  const isCreator = blog.user?.username === username

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id, updatedBlog)
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <p>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </p>
      <p>added by {blog.user?.name}</p>
      {isCreator && (
        <button onClick={() => removeBlog(blog.id)}>remove</button>
      )}

      <h3>Comments</h3>
      <CommentForm blogId={blog.id} />
      <ul>
        {blog.comments?.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
