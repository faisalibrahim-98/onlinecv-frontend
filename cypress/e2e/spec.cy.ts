describe('CV Bank E2E Tests', () => {
  it('should go to the starting page', () => {
    cy.visit('http://localhost:4200/')
  })

  it('should click the sign up a user', () => {
    cy.visit('http://localhost:4200/')

    cy.contains('Sign Up').click()
    cy.url().should('include', '/signup')

    cy.get('#username').type('Faisal2')
    cy.get('#username').should('have.value', 'Faisal2')

    cy.get('#email').type('test3@test.com')
    cy.get('#email').should('have.value', 'test3@test.com')

    cy.get('#password').type('password123')
    cy.get('#password').should('have.value', 'password123')
  })

  it('should create a users CV', () => {
    cy.visit('http://localhost:4200/dashboard?id=6459b070641ad411e3d6b276')
    cy.contains('6459b070641ad411e3d6b276')

    cy.get('#create').click()

    cy.get('input[formControlName=name]').type('Faisal Job Seeker')

    cy.get('input[formControlName=email]').type('faisalJobSeeker@job.com')

    cy.get('input[formControlName=age]').type('20')

    cy.get('select[formControlName=interest]').select('management')

    cy.get('input[value=dataAnalysis]').click()
    cy.get('input[value=marketing]').click()

    cy.get('input[value=Bachelors]').click()

    cy.get('select[formControlName=gcse]').select('7')

    cy.get('input[formControlName=fieldName]').type('Marketing')

    cy.get('input[formControlName=jobSector]').type('Marketing Analyst')

    cy.get('input[formControlName=experience]').type('4')

    cy.get('input[formControlName=contact]').type('Marketing Analyst')

    cy.get('#submit').click();
    cy.wait(1000)

    cy.get('a').click()
  })

  it('should view the CV', () => {
    cy.visit('http://localhost:4200/dashboard?id=6459b070641ad411e3d6b276')
    cy.wait(1000)
    cy.contains('6459b070641ad411e3d6b276')

    cy.get('#view').click()
    cy.wait(1000)

    cy.get('#view-close').click()
  })

  it('should update the CV', () => {
    cy.visit('http://localhost:4200/dashboard?id=6459b070641ad411e3d6b276')
    cy.wait(1000)
    cy.contains('6459b070641ad411e3d6b276')

    cy.get('#update').click()

    cy.get('input[formControlName=name]').clear()
    cy.get('input[formControlName=name]').type('Ibrahim')

    cy.get('input[formControlName=contact]').clear()
    cy.get('input[formControlName=contact]').type('Development Operations')

    cy.get('#submit').click()

    cy.get('#go-back').click()
  })

  it('should delete the CV', () => {
    cy.visit('http://localhost:4200/dashboard?id=6459b070641ad411e3d6b276')
    cy.wait(1000)
    cy.contains('6459b070641ad411e3d6b276')

    cy.get('#delete').click()
    cy.contains('Your CV has Been Deleted')
    cy.wait(1000)

    cy.get('#deleted').click()
  })

  it('should see empty message when viewing CV', () => {
    cy.visit('http://localhost:4200/dashboard?id=6459b070641ad411e3d6b276')
    cy.contains('6459b070641ad411e3d6b276')

    cy.get('#view').click()
    cy.wait(1000)
    cy.contains('You Have Not Created a CV Yet!')
    cy.wait(1000)

    cy.get('#not-created').click()
  })

  it('should create a users CV', () => {
    cy.visit('http://localhost:4200/dashboard?id=6459b070641ad411e3d6b276')
    cy.contains('6459b070641ad411e3d6b276')

    cy.get('#create').click()

    cy.get('input[formControlName=name]').type('Faisal Job Seeker')

    cy.get('input[formControlName=email]').type('faisalJobSeeker@job.com')

    cy.get('input[formControlName=age]').type('20')

    cy.get('select[formControlName=interest]').select('management')

    cy.get('input[value=dataAnalysis]').click()
    cy.get('input[value=marketing]').click()

    cy.get('input[value=Bachelors]').click()

    cy.get('select[formControlName=gcse]').select('7')

    cy.get('input[formControlName=fieldName]').type('Marketing')

    cy.get('input[formControlName=jobSector]').type('Marketing Analyst')

    cy.get('input[formControlName=experience]').type('4')

    cy.get('input[formControlName=contact]').type('Marketing Analyst')

    cy.get('#submit').click();
    cy.wait(1000)

    cy.get('a').click()
  })

  it('should go back to the homepage when log out is clicked', () => {
    cy.visit('http://localhost:4200/dashboard?id=6459b070641ad411e3d6b276')
    cy.contains('6459b070641ad411e3d6b276')

    cy.get('#logout-link').click()
    cy.url().should('include', '/')
  })

  it('should login as recruiter', () => {
    cy.visit('http://localhost:4200/')

    cy.get('#login-homepage').click()
    cy.url().should('include', '/login')

    cy.get('input[formControlName=email]').type('recruiter@test.com')
    cy.get('input[formControlName=email]').should('have.value', 'recruiter@test.com')

    cy.get('input[formControlName=password]').type('password')
    cy.get('input[formControlName=password]').should('have.value', 'password')

    cy.get('#login-submit').click()

    cy.url().should('include', '6459b2d4278695875a0b4ffe')
  })

  it('should go to the search page', () => {
    cy.visit('http://localhost:4200/dashboard?id=6459b2d4278695875a0b4ffe')
    cy.url().should('include', '6459b2d4278695875a0b4ffe')

    cy.get('#search-candidates').click()

    cy.url().should('include', '/search')
  })

  it('should search for candidate', () => {
    cy.visit('http://localhost:4200/search?id=6459b2d4278695875a0b4ffe')
    cy.url().should('include', '6459b2d4278695875a0b4ffe')

    cy.get('input[formControlName=userId]').type('64564ed0105682424bdd5b7f')

    cy.get('select[formControlName=mostRecentEducation]').select('Masters')

    cy.get('input[formControlName=educationalField]').type('software')

    cy.get('input[formControlName=experience]').type('4')

    cy.get('input[formControlName=jobSector]').type('backend')

    cy.get('.search-btn').click()

    cy.contains('090078601')
    cy.contains('women')
  })

  it('should go back to the homepage when log out is clicked', () => {
    cy.visit('http://localhost:4200/dashboard?id=6459b070641ad411e3d6b276')
    cy.contains('6459b070641ad411e3d6b276')

    cy.get('#logout-link').click()
    cy.url().should('include', '/')
  })

  it('should login as candidate', () => {
    cy.visit('http://localhost:4200/')

    cy.get('#login-homepage').click()
    cy.url().should('include', '/login')

    cy.get('input[formControlName=email]').type('test1@test.com')
    cy.get('input[formControlName=email]').should('have.value', 'test1@test.com')

    cy.get('input[formControlName=password]').type('password')
    cy.get('input[formControlName=password]').should('have.value', 'password')
  })

  it('should delete the CV', () => {
    cy.visit('http://localhost:4200/dashboard?id=6459b070641ad411e3d6b276')
    cy.contains('6459b070641ad411e3d6b276')

    cy.get('#delete').click()
    cy.contains('Your CV has Been Deleted')
    cy.wait(1000)

    cy.get('#deleted').click()
  })

  it('should see empty message when viewing CV', () => {
    cy.visit('http://localhost:4200/dashboard?id=6459b070641ad411e3d6b276')
    cy.contains('6459b070641ad411e3d6b276')

    cy.get('#view').click()
    cy.contains('You Have Not Created a CV Yet!')
    cy.wait(1000)

    cy.get('#not-created').click()
  })

})