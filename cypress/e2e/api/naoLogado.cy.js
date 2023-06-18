describe('GET API - Profile', () => {
    
    //before(() => {
    //    cy.readFile('C:/Iterasys137/cursocy/cypress/fixtures/token.json') 
    //        .then((body) => {
    //            body.jwt
    //            cy.request({
    //                method: 'DELETE',
    //                url: '/api/profile',
    //                log: true
    //            })
    //        })
    //})

    context('valida API de perfis', () => {
        
        it('consulta todos os perfis', () => {
            cy.request({
                url: '/api/profile',
                method: 'GET',
                log: true
            }).then(({ status, duration, body }) => {
                expect(status, 'Status Code').to.eq(200),
                expect(duration, 'Duration').to.be.lessThan(2000)
                expect(body[0].date).to.not.be.null
            })
        })
    })    
    context('valida API de perfil específico', () => {    
        it('consulta usuário válido pelo ID', () => {
            let userID = '6438653da29a022fb457d6ff'
            
            cy.request({
                method: 'GET',
                url: `/api/profile/user/${userID}`,
                log: true          
            }).then(({ status, duration }) => {
                expect(status).to.be.eq(200),
                expect(duration, 'Duração').to.be.lessThan(2000)
            })
        })
    
        it('consulta usuário inválido pelo ID', () => {
            let userID = '1'
            
            cy.request({
                method: 'GET',
                url: `/api/profile/user/${userID}`,
                log: true, 
                failOnStatusCode: false         
            }).then(({ status, duration }) => {
                expect(status).to.be.eq(404),
                expect(duration, 'Duração').to.be.lessThan(2000)
            })
        })
    })
    context('valida API criar usuário', () => {   
        it('cria usuário com sucesso', () => {
            cy.request({
                method: 'POST',
                url: '/api/users',
                log: true,
                body: {
                    "name": Cypress.env('name1'),
                    "email": Cypress.env('name1'),
                    "password": Cypress.env('email1')
                }
            }).then(({ duration, status, body }) => {
                expect(duration, 'Duração').to.be.lessThan(2000),
                expect(status, 'Status Code').to.be.eq(201),    
                expect(body.jwt, 'Token').to.have.lengthOf(183)
            })
        })
    })
    context('valida API de logar na aplicacao', () => {   
        it('logar na aplicação com sucesso', () => {
            cy.request({
                method: 'POST',
                url: '/api/auth',
                log: true,
                body: {
                    "email": Cypress.env('name1'),
                    "password": Cypress.env('email1')
                }   
            }).then(({ status, duration, body }) => {
                expect(status).to.be.eq(200),
                expect(duration, 'Duração').to.be.lessThan(2000),
                expect(body.jwt, 'Token').to.have.lengthOf(183)
                cy.writeFile('cypress/fixtures/token.json', body)
            })
        })
    })
})