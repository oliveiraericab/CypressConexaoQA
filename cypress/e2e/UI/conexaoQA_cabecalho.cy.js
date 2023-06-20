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
            cy.get('[data-test=navbar-register]')
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
    

        it('valida os menus utilizando array', () => {

            const menus = [
                { seletor: 'navbar-conexaoQA', link: '/' },
                { seletor: 'navbar-QAs', link: '/perfis' },
                { seletor: 'navbar-about', link: '/sobre' },
                { seletor: 'navbar-register', link: '/cadastrar' },
                { seletor: 'navbar-login', link: '/login' }
            ]

            menus.forEach(({ seletor, link }) => {
                cy.get(`[data-test=${seletor}]`)
                    .should('have.attr', 'href', link)
                    .and('not.have.attr', 'target')
            })
        })

        ;[
            { seletor: 'navbar-conexaoQA', link: '/', menu: ' ConexãoQA' },
            { seletor: 'navbar-QAs', link: '/perfis', menu: 'QAs' },
            { seletor: 'navbar-about', link: '/sobre', menu: 'Sobre' },
            { seletor: 'navbar-register', link: '/cadastrar', menu: 'Cadastrar' },
            { seletor: 'navbar-login', link: '/login', menu: 'Login' }
        ].forEach(({ seletor, link, menu }) => {

            it.only(`valida o menu ${menu}`, () => {
                cy.getElement(seletor)
                    .should('have.attr', 'href', link)
                    .and('not.have.attr', 'target', 'blank')
                    .and('have.text', menu)
            })
        })
    })

    context('logado', () => {
        
    })
})