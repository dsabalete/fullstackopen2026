import React from "react";

const BlogForm = ({
  newBlogTitle,
  setNewBlogTitle,
  newBlogAuthor,
  setNewBlogAuthor,
  newBlogUrl,
  setNewBlogUrl,
  addBlog,
}) => (
  <form onSubmit={addBlog}>
    <p>
      <label>
        title:
        <input
          value={newBlogTitle}
          onChange={(event) => setNewBlogTitle(event.target.value)}
        />
      </label>
    </p>

    <p>
      <label>
        author:
        <input
          value={newBlogAuthor}
          onChange={(event) => setNewBlogAuthor(event.target.value)}
        />
      </label>
    </p>

    <p>
      <label>
        url:
        <input
          value={newBlogUrl}
          onChange={(event) => setNewBlogUrl(event.target.value)}
        />
      </label>
    </p>

    <button type="submit">save</button>
  </form>
);

export default BlogForm;
