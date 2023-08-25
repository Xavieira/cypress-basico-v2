/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')
      })
    
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('clica e digita em campos obrigatórios', function () {
        cy.get('#firstName')
          .click()
          .type('XPTO')

        cy.get('#lastName')
          .click()
          .type('Xavier')

        cy.get('#email')
          .click()
          .type('xptoxavier@gmail.com')
        
        cy.get('#open-text-area')
          .click()
          .type('Teste de escrita do Cypress')
        
        cy.get('.button')
          .click()
        
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName')
        .click()
        .type('XPTO')

      cy.get('#lastName')
        .click()
        .type('Xavier')

      cy.get('#email')
        .click()
        .type('xptoxavier')
      
      cy.get('#open-text-area')
        .click()
        .type('Teste de escrita do Cypress')
        cy.get('.button')
          .click()

        cy.get('.error')
          .should('be.visible')
    })
})