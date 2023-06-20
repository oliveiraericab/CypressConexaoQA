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

Cypress.Commands.add('consultarUsuario', () => {

    cy.request({
        method: 'GET',
        url: '/api/profile/me',
        log: true
    })
})

//seleciona um elemento pelo atributo data-test
Cypress.Commands.add('getElement', (seletor) => {
    return cy.get(`[data-test=${seletor}]`)
})
