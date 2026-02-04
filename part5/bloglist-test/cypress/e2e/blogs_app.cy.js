describe('Blogs app', () => {
  beforeEach(function () {
    cy.request('POST', '/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword',
    }
    cy.request('POST', '/api/users/', user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.contains('username').should('be.visible')
    cy.contains('password').should('be.visible')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('button', 'login').click()
      cy.contains('label', 'username').type('testuser')
      cy.contains('label', 'password').type('testpassword')
      cy.get('#login-button').click()

      cy.contains('Test User logged in')
    })

    it('fails with invalid username or password', function () {
      cy.contains('button', 'login').click()
      cy.contains('label', 'username').type('testuser')
      cy.contains('label', 'password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Test User logged in').should('not.exist')

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpassword' })
    })

    it('A blog can be created', function () {
      cy.contains('button', 'new blog').click()
      cy.contains('label', 'title').type('Test Blog')
      cy.contains('label', 'author').type('Test Author')
      cy.contains('label', 'url').type('http://test.com')
      cy.get('#create-button').click()
      cy.contains('Test Blog')
    })
  })

  describe('when a blog exists', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpassword' })
      cy.createBlog({
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
      })
    })

    it('a blog can be liked', function () {
      cy.contains('Test Blog').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.contains('button', 'like').click()
      cy.contains('likes: 1')
    })

    it('a blog can be deleted', function () {
      cy.contains('Test Blog').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.contains('button', 'remove').click()
      cy.contains('Test Blog').should('not.exist')
    })

    it('only the creator can see the delete button', function () {
      cy.contains('Test Blog').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.contains('button', 'remove').should('be.visible')

      const otherUser = {
        name: 'Other User',
        username: 'otheruser',
        password: 'otherpassword',
      }
      cy.request('POST', '/api/users/', otherUser)
      cy.login({ username: 'otheruser', password: 'otherpassword' })

      cy.contains('Test Blog').parent().find('button').as('theButton')
      cy.get('@theButton').click()
      cy.contains('button', 'remove').should('not.exist')
    })
  })
})
