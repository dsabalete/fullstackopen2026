import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import CommentForm from './CommentForm.jsx'

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    borderBottom: '3px solid #f0f0f0',
    paddingBottom: '20px',
    marginBottom: '25px',
  },
  title: {
    fontSize: '2em',
    margin: '0 0 10px 0',
    color: '#2c3e50',
    fontWeight: '600',
  },
  author: {
    fontSize: '1.1em',
    color: '#7f8c8d',
    fontStyle: 'italic',
    margin: '0',
  },
  content: {
    marginBottom: '25px',
  },
  link: {
    display: 'inline-block',
    color: '#3498db',
    textDecoration: 'none',
    padding: '8px 12px',
    backgroundColor: '#ecf0f1',
    borderRadius: '6px',
    marginBottom: '15px',
    wordBreak: 'break-all',
    transition: 'background-color 0.2s',
  },
  likesSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '15px 0',
  },
  likesCount: {
    fontSize: '1.1em',
    fontWeight: '500',
    color: '#2c3e50',
  },
  addedBy: {
    color: '#7f8c8d',
    fontSize: '0.95em',
    margin: '10px 0',
  },
  commentsSection: {
    marginTop: '40px',
    borderTop: '2px solid #f0f0f0',
    paddingTop: '30px',
  },
  commentsTitle: {
    fontSize: '1.5em',
    margin: '0 0 20px 0',
    color: '#2c3e50',
    fontWeight: '500',
  },
  commentsList: {
    listStyle: 'none',
    padding: '0',
    margin: '20px 0 0 0',
  },
  commentItem: {
    padding: '15px',
    backgroundColor: '#f8f9fa',
    borderLeft: '4px solid #3498db',
    marginBottom: '12px',
    borderRadius: '6px',
    fontSize: '0.95em',
    color: '#2c3e50',
  },
  noComments: {
    color: '#95a5a6',
    fontStyle: 'italic',
    padding: '15px',
    textAlign: 'center',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '1.1em',
    color: '#7f8c8d',
  },
}

const BlogView = ({ updateBlog, removeBlog, username }) => {
  const { id } = useParams()

  const { data: blogs, isLoading, isError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })

  if (isLoading) {
    return <div style={styles.loading}>Loading blog...</div>
  }

  if (isError) {
    return <div style={styles.loading}>Error loading blog</div>
  }

  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return <div style={styles.loading}>Blog not found</div>
  }

  const isCreator = blog.user?.username === username

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateBlog(blog.id, updatedBlog)
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{blog.title}</h2>
        <p style={styles.author}>by {blog.author}</p>
      </div>

      <div style={styles.content}>
        <a
          href={blog.url}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
          onMouseOver={(e) => e.target.style.backgroundColor = '#d5dbdd'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ecf0f1'}
        >
          {blog.url}
        </a>

        <div style={styles.likesSection}>
          <span style={styles.likesCount}>{blog.likes} likes</span>
          <button
            onClick={handleLike}
            className="btn btn-primary"
          >
            👍 like
          </button>
        </div>

        <p style={styles.addedBy}>added by {blog.user?.name}</p>

        {isCreator && (
          <button
            onClick={() => removeBlog(blog.id)}
            className="btn btn-danger"
          >
            🗑️ remove
          </button>
        )}
      </div>

      <div style={styles.commentsSection}>
        <h3 style={styles.commentsTitle}>Comments</h3>
        <CommentForm blogId={blog.id} />
        {blog.comments && blog.comments.length > 0 ? (
          <ul style={styles.commentsList}>
            {blog.comments.map((comment) => (
              <li key={comment.id} style={styles.commentItem}>
                {comment.content}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noComments}>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  )
}

export default BlogView
