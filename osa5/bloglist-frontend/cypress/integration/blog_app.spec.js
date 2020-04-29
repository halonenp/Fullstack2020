describe('Blog app', function () {
  beforeEach(function () {
    //cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'testiukko',
      name: 'Testi Ukko',
      password: 'ukko'
    }
    // cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in')
  })
  describe('Login', function () {
    it('succeeds with corerct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('testiukko')
      cy.get('#password').type('ukko')
      cy.get('#login-button').click()
      cy.contains('Testi Ukko logged in')
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('olematon')
      cy.get('#password').type('kengurupallo')
      cy.contains('login').click()
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
      cy.contains('Log in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('testiukko')
      cy.get('#password').type('ukko')
      cy.get('#login-button').click()
      cy.contains('Testi Ukko logged in')
      cy.contains('blogs')
    })
    it("A blog can be created", function () {
      cy.contains('new blog').click()
      cy.get('#title').type("testiukon blogin otsikko")
      cy.get('#author').type("testiukon author")
      cy.get('#url').type("testiukon url")
      cy.get('#blog-button').click()
      cy.contains("a new blog added")
      cy.contains("testiukon blogin otsikko")
      cy.contains("testiukon author")
      cy.contains("testiukon blogin otsikko").click()
      //cy.get('#remov').click({force: true})

    })
  })
})