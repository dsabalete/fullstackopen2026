import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm.jsx";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      setErrorMessage(`${err.response.data.error}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
      likes: 0,
    };

    const returnedBlog = await blogService.create(blogObject);

    if (returnedBlog.error) {
      setErrorMessage(returnedBlog.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    } else {
      setMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      );
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

    setBlogs(blogs.concat(returnedBlog));
    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogUrl("");
  };

  return (
    <div>
      <h1>Bloglist app</h1>
      <Notification message={message} errorMessage={errorMessage} />

      {!user && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}

      {user && (
        <section>
          <div>
            <p>
              {user.name} logged in{" "}
              <button onClick={handleLogout}>logout</button>
            </p>
          </div>

          <h3>create new</h3>
          <BlogForm
            newBlogTitle={newBlogTitle}
            setNewBlogTitle={setNewBlogTitle}
            newBlogAuthor={newBlogAuthor}
            setNewBlogAuthor={setNewBlogAuthor}
            newBlogUrl={newBlogUrl}
            setNewBlogUrl={setNewBlogUrl}
            addBlog={addBlog}
          />
          <h3 style={{ marginTop: "2em" }}>list of blogs</h3>
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default App;
