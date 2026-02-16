import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import usersService from '../services/users'

const User = () => {
  const { id } = useParams()

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
  })

  if (isLoading) {
    return <div className="user-loading">Loading...</div>
  }

  if (isError) {
    return <div className="user-loading">Error loading user</div>
  }

  const user = users.find((u) => u.id === id)

  if (!user) {
    return <div className="user-loading">User not found</div>
  }

  return (
    <div className="user-container">
      <h2 className="user-header">👤 {user.name}</h2>
      <h3 className="user-subheader">📝 Added Blogs</h3>
      {user.blogs.length === 0 ? (
        <p className="user-empty-state">No blogs added yet</p>
      ) : (
        <ul className="user-blog-list">
          {user.blogs.map((blog) => (
            <li key={blog.id} className="user-blog-item">
              <Link to={`/blogs/${blog.id}`} className="user-blog-link">
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default User
