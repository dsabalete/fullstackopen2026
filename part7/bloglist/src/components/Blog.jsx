import { Link } from 'react-router-dom'
import { useState } from 'react'

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.2s ease',
    border: '1px solid #e8e8e8',
  },
  containerHover: {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
    transform: 'translateY(-2px)',
  },
  link: {
    textDecoration: 'none',
    color: '#2c3e50',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
  },
  title: {
    fontSize: '1.2em',
    fontWeight: '500',
    color: '#2c3e50',
    margin: 0,
  },
  author: {
    fontSize: '0.95em',
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  arrow: {
    color: '#3498db',
    fontSize: '1.2em',
    marginLeft: 'auto',
  },
}

const Blog = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        ...styles.container,
        ...(isHovered ? styles.containerHover : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/blogs/${blog.id}`} style={styles.link}>
        <div>
          <div style={styles.title}>{blog.title}</div>
          <div style={styles.author}>by {blog.author}</div>
        </div>
        <span style={styles.arrow}>→</span>
      </Link>
    </div>
  )
}

export default Blog
