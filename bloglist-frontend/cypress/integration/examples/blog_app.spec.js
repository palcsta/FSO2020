

describe('Blog ', function () {
  beforeEach(function () {

    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3003')
  })
  it('front page can be opened', function () {

    cy.contains('FullStackOpen 2020')
    cy.contains('sign in')
  })
  it('Login from is shown', function () {
    cy.contains('sign in').click()
    cy.contains('login')

  })


})


describe('Login', function () {
  beforeEach(function () {

    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3003')
  })



  it('succeeds with correct credentials', function () {
    cy.contains('sign in').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('logged in')
  })

  it('fails with wrong credentials', function () {
    cy.contains('sign in').click()
    cy.get('#username').type('fake')
    cy.get('#password').type('fake')
    cy.get('#login-button').click()

    cy.contains('wrong')
  })
})

describe('Blog app', function () {
  // ...

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3003')
      cy.contains('sign in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('Create a blog!').click()
      cy.get('#url').type('www.wikipedia.org')
      cy.get('#title').type('wiki')
      cy.get('#author').type('community')
      cy.get('#add_blog').click()
      cy.contains('added blog')
      //Successfully added blog: a

    })

    it('A blog can be liked', function () {
      cy.contains('Create a blog!').click()
      cy.get('#url').type('www.wikipedia.org')
      cy.get('#title').type('wiki')
      cy.get('#author').type('community')
      cy.get('#add_blog').click()
      cy.contains('added blog')
      cy.contains('info').click()
      cy.contains('like!').click()
      cy.contains('likes: 1')
      //Successfully added blog: a

    })
    it('A blog can be removed', function () {
      cy.contains('Create a blog!').click()
      cy.get('#url').type('www.wikipedia.org')
      cy.get('#title').type('wiki')
      cy.get('#author').type('community')
      cy.get('#add_blog').click()
      cy.contains('info').click()
      cy.contains('remove a blog!').click()
      cy.visit('http://localhost:3003')
      cy.contains('info').should('not.exist')
      //Successfully added blog: a

    })

    it('Blogs are sorted by likes', function () {
      cy.contains('Create a blog!').click()
      cy.get('#url').type('first')
      cy.get('#title').type('first')
      cy.get('#author').type('first')
      cy.get('#add_blog').click()



      cy.visit('http://localhost:3003')
      cy.contains('Create a blog!').click()
      cy.get('#url').type('second')
      cy.get('#title').type('second')
      cy.get('#author').type('second')
      cy.get('#add_blog').click()


      cy.visit('http://localhost:3003')
      cy.contains('Create a blog!').click()
      cy.get('#url').type('third')
      cy.get('#title').type('third')
      cy.get('#author').type('third')
      cy.get('#add_blog').click()


      cy.get('button').then(buttons => {
        console.log('number of buttons---------------!!!!!!!!!!----------', buttons.length)
        cy.wrap(buttons[3]).click()
      })
      cy.get('button').then(buttons => {
        console.log('number of buttons---------------!!!!!!!!!!----------', buttons.length)
        cy.wrap(buttons[4]).click()
      })

      cy.visit('http://localhost:3003')
      cy.get('li').eq(0).should('contain', 'second')
    })





  })

})





