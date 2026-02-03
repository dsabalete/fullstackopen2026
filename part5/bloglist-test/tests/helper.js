const loginWith = async (page, username, password) => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByLabel('title').fill(title)
  await page.getByLabel('author').fill(author)
  await page.getByLabel('url').fill(url)
  await page.getByRole('button', { name: 'save' }).click()
  await page.getByText(title, { exact: true }).waitFor()
}

const likeBlog = async (page, title, times) => {
  const blogElement = page.locator('.blog').filter({ hasText: title })
  await blogElement.getByRole('button', { name: 'view' }).click()
  const likeButton = blogElement.getByRole('button', { name: 'like' })
  
  for (let i = 0; i < times; i++) {
    await likeButton.click()
    await blogElement.getByText(`likes: ${i + 1}`).waitFor()
  }
}

export { loginWith, createBlog, likeBlog }