describe('cabeçalho da página home', () => {
    context('não logado', () => {
        beforeEach(() => {
            cy.visit('/')
        })
        it('valida o menu conexaoQA', () => {
            cy.get('[data-test=navbar-conexaoQA]')
                .should('have.text', ' ConexãoQA')
                .and('have.attr', 'href', '/')
                .and('not.have.attr', 'target')
        })

        it('valida o menu QAs', () => {
            cy.get('[data-test=navbar-QAs]')
                .should('have.text', 'QAs')
                .and('have.attr', 'href', '/perfis')
                .and('not.have.attr', 'target')
        })
        it('valida o menu Sobre', () => {
            cy.get('[data-test=navbar-about]')
                .should('have.text', 'Sobre')
                .and('have.attr', 'href', '/sobre')
                .and('not.have.attr', 'target')
        })

        it('valida o menu Cadastrar', () => {
            cy.get('[data-test=navbar-register ]')
                .should('have.text', 'Cadastrar')
                .and('have.attr', 'href', '/cadastrar')
                .and('not.have.attr', 'target')
        })

        it('valida o menu Login', () => {
            cy.get('[data-test=navbar-login]')
                .should('have.text', 'Login')
                .and('have.attr', 'href', '/login')
                .and('not.have.attr', 'target')
        })
    })

    context('logado', () => {
        
    })
})