const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, likeBlog } = require('./helper.js')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Test User',
        username: 'usertest',
        password: 'secret',
      },
    })
    await request.post('/api/users', {
      data: {
        name: 'Other User',
        username: 'other',
        password: 'password',
      },
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click();
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'usertest', 'secret')
      await expect(page.getByText('Test User logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'usertest', 'wrong')
      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'usertest', 'secret')
    })

    test('a new blog can be created', async ({ page }) => {
      createBlog(page, 'new blog title', 'new blog author', 'new blog url')
      await expect(page.getByText('new blog title', { exact: true })).toBeVisible()
      await expect(page.getByText('new blog author', { exact: true })).toBeVisible()
      
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('added by Test User', { exact: true })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      createBlog(page, 'new blog title', 'new blog author', 'new blog url')
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes: 1')).toBeVisible()
    })
    
    test('a blog can be removed by the owner', async ({ page }) => {
      createBlog(page, 'new blog title', 'new blog author', 'new blog url')
      page.on('dialog', dialog => dialog.accept());
      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('new blog title', { exact: true })).not.toBeVisible()
    })

    test('only the user who added the blog sees the blogs delete button', async ({ page, request }) => {
      await createBlog(page, 'new blog title', 'new blog author', 'new blog url')
      
      // Logout
      await page.getByRole('button', { name: 'logout' }).click()
      await expect(page.getByText('Test User logged in')).not.toBeVisible()

      // Login as the 'other' user
      await loginWith(page, 'other', 'password')
      await expect(page.getByText('Other User logged in')).toBeVisible()

      // Check that the 'other' user can't remove the blog
      await page.getByText('new blog title', { exact: true }).waitFor()
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    }) 

    test('multiple blogs are ordered by likes', async ({ page }) => {
      await createBlog(page, 'blog without likes', 'author1', 'url1')
      await createBlog(page, 'blog with many likes', 'author2', 'url2')
      await createBlog(page, 'blog with medium likes', 'author3', 'url3')
      
      // Like the blogs
      await likeBlog(page, 'blog with many likes', 5)
      await likeBlog(page, 'blog with medium likes', 2)
      
      // Check the order of the blogs
      const blogs = page.locator('.blog')
      await expect(blogs.first()).toContainText('blog with many likes')
      await expect(blogs.nth(1)).toContainText('blog with medium likes')
      await expect(blogs.nth(2)).toContainText('blog without likes')
    })
  })

})
