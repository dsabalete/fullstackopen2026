import { useState } from "react";

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    padding: "1rem",
    border: "solid",
    borderWidth: 1,
    marginBottom: "1rem",
  };

  const updateLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(blog.id, updatedBlog);
  };

  return (
    <div style={blogStyle}>
      <p>
        <em>{blog.title}</em> - by {blog.author}{" "}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "view"}
        </button>
      </p>
      <div style={{ display: showDetails ? "block" : "none" }}>
        <p>
          url:{" "}
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
        </p>
        <p>
          likes: {blog.likes} <button onClick={() => updateLike()}>like</button>
        </p>
        <p>{blog.user && <span>added by {blog.user.name}</span>}</p>
      </div>
    </div>
  );
};

export default Blog;
