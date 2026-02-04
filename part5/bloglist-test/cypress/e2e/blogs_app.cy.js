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
})
