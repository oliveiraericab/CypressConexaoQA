Cypress.Commands.add('login', (email, password) => {

    cy.session([email, password], () => {
        cy.request({
            method: 'POST',
            url: '/api/auth',
            log: true,
            body: {
                email,
                password
            }   
        })
    }, { cacheAcrossSpecs: true })
    
})