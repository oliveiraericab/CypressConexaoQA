describe('PROFILES POST E GET', () => {

    beforeEach(() => {
        cy.login(Cypress.env('email1'), Cypress.env('senha1'))
    })

    context('validar api Criar Usuário - POST Profile', () => {
        it('criar usuário com sucesso', () => {
            cy.request({
                method: 'POST',
                url: 'api/profile',
                log: true,
                body: {
                    "company": "Iterasys",
                    "status": "Júnior",
                    "location": "Salvador - Ba",
                    "website": "string",
                    "skills": "Cypress, Selenium, RESTassured, Testes Manuais",
                    "bio": "Analista de Testes | QA",
                    "githubusername": "oliveiraericab",
                    "youtube": "string",
                    "twitter": "string",
                    "facebook": "string",
                    "linkedin": "https://www.linkedin.com/in/erica-oliveira-erica/",
                    "instagram": "string",
                    "medium": "string"
                }
            }).then((response) => {
                expect(response.status, 'Status Code').to.eq(200),
                expect(response.duration, 'Duration').to.be.lessThan(2000)
                expect(response.body.date).to.not.be.null
                expect(response.body.bio, 'Bio').to.eq('Analista de Testes | QA')
                expect(response.body.skills[0], 'Habilidades').to.eq('Cypress')
            })    
        })
    })

    context('validar api consultar usuário logado - GET Profile/me', () => {
        it('consultar usuário logado pelo token', () => {
            cy.request({
                method: 'GET',
                url: '/api/profile/me',
                log: true
            }).then((response) => {
                expect(response.status, 'Status Code').to.eq(200),
                expect(response.duration, 'Duration').to.be.lessThan(2000)
                expect(response.body.bio, 'Bio').to.eq('Analista de Testes | QA')
            })
        })
    })
    context('validar api consultar usuário especifico - GET UserID', () => {
        // get para pegar id
        it('consultar usuário pelo ID com sucesso', () => {
            cy.request({
                method: 'GET',
                url: '/api/profile/me',
                log: true
            }).then(({ body }) => {
                
                cy.request({
                    method: 'GET',
                    url: `/api/profile/user/${body.user._id}`,
                    log: true          
                }).then(({ status, duration }) => {
                    expect(status, 'Status Code').to.be.eq(200),
                    expect(duration, 'Duração').to.be.lessThan(2000)
                })
            })
        })
    })   
    context('validar api selecionar repositório GitHub - GET github', () => {
        // get para pegar id
        it('selecionar repositorios github', () => {
            cy.request({
                method: 'GET',
                url: '/api/profile/me',
                log: true
            }).then(({ body }) => {

                cy.request({
                    url: `/api/profile/github/${body.gitHubUsername}`   
                }).then(({ status, duration }) => {
                    expect(status, 'Status Code').to.eq(200)
                    expect(duration, 'Duração').to.be.lessThan(2000)
                })
            })    
        }) 
    })
    context('perfil criado e logado - PUT E DELETE PROFILES', () => {
        it('adicionar experiência profissional', () => {
            cy.request({
                method: 'PUT',
                url: '/api/profile/experience',
                log: true,
                body:{
                    "title": "Testadora",
                    "company": "ConexaoQA",
                    "location": "Remote",
                    "from": "2023-05-23",
                    "to": "2023-05-23",
                    "current": false,
                    "description": "string"
                }
            }).then(({ status, duration, body }) => {
                expect(status, 'Status Code').to.eq(200)
                expect(duration, 'Duração').to.be.lessThan(2000)
                expect(body.experience[0]._id, 'ID Experiência Profissional').is.not.null
            })
        })
        it('deletar experiencia profissional', () => {
            cy.request({
                method: 'PUT',
                url: '/api/profile/experience',
                log: true,
                body:{
                    "title": "Testadora",
                    "company": "ConexaoQA",
                    "location": "Remote",
                    "from": "2023-05-23",
                    "to": "2023-05-23",
                    "current": false,
                    "description": "string"
                }
            }).then(({ body }) => {

                cy.request({
                    method: 'DELETE',           
                    url: `/api/profile/experience/${body.experience[0]._id}`,
                    log: true
                }).then(({ status, duration }) => {
                    expect(status, 'Status Code').to.eq(200)
                    expect(duration, 'Duração').to.be.lessThan(2000)
                })
            })    
        })  
        it('adicionar formação acadêmica', () => {
            cy.request({
                method: 'PUT',
                url: '/api/profile/education',
                log: true,
                body:{
                    "school": "Universidade Federal da Bahia",
                    "degree": "Bacharelado Interdisciplinar em Ciência e Tecnologia",
                    "fieldofstudy": "string",
                    "from": "2023-05-23",
                    "to": "2023-05-23",
                    "current": false,
                    "description": "string"
                }
            }).then(({ status, body }) => {
                expect(status, 'Status Code').to.eq(200)
                expect(body.education[0]._id, 'ID Formação Acadêmica').is.not.null
                expect(body.education[0].school, 'Instituição').to.eq('Universidade Federal da Bahia')
                expect(body.education[0].degree, 'Empresa').to.eq('Bacharelado Interdisciplinar em Ciência e Tecnologia')
            })
        })
        it('deletar formação acadêmica', () => {
            cy.request({
                method: 'PUT',
                url: '/api/profile/education',
                log: true,
                body:{
                    "school": "Universidade Federal da Bahia",
                    "degree": "Bacharelado Interdisciplinar em Ciência e Tecnologia",
                    "fieldofstudy": "string",
                    "from": "2023-05-23",
                    "to": "2023-05-23",
                    "current": false,
                    "description": "string"
                }
            }).then(({ body }) => {    

                cy.request({
                    method: 'DELETE',
                    url: `/api/profile/education/${body.education[0]._id}`,
                    log: true
                }).then(({ status, duration }) => {
                    expect(status, 'Status Code').to.eq(200)
                    expect(duration, 'Duração').to.be.lessThan(2000)
                })
            })
        })
    })
})