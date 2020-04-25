describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        username: 'ukkok',
        name: 'Ukko',
        password: 'ukko'      
      }
        cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login from is shown', function() {
        cy.contains('Log in')
    })
  })