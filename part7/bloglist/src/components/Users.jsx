import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import usersService from '../services/users'

const Users = () => {
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: usersService.getAll,
  })

  if (isLoading) {
    return <div className="users-loading">Loading users...</div>
  }

  if (isError) {
    return <div className="users-loading">Error loading users</div>
  }

  return (
    <div className="users-container">
      <h2 className="users-header">👥 Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} className="users-table-link">
                  {user.name}
                </Link>
              </td>
              <td className="users-blog-count">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
