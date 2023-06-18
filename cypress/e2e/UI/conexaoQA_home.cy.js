describe('página inicial', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('valida o título da página inicial', () => {
        cy.get('[data-test=landing-title]')
            .should('have.text', 'Conectando QAs ...')
            .and('have.class', 'x-large')
    })
    it('seleciona um elemento com contains', () => {
        cy.contains('h1', 'Conectando QAs')
            .should('have.text', 'Conectando QAs ...')
    })
    it('valida uma propriedade css', () => {
        //valida se o texto do botão é branco
        cy.get('[data-test=landing-register]')
            .should('have.css', 'color', 'rgb(255, 255, 255)')
    })
    it('seleciona um elemento usando filter', () => {
        //filtrar usando o comando filter
        cy.get('a')
            .filter('.btn-primary')
            .should('have.text', 'Cadastrar')

        //filtar usando o comando eq
        cy.get('a')
            .eq(6)
            .should('have.text', 'Login')
            
    })


})