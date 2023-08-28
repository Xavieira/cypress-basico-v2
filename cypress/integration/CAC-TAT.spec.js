/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', function () {
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

    cy.contains('button', 'Enviar')
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
    cy.contains('button', 'Enviar')
      .click()

    cy.get('.error')
      .should('be.visible')
  })
  it('testando se o campo telefone aceita letras', function () {
    cy.get('#phone')
      .click()
      .type('XPTO')

  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', function () {
    cy.get('#firstName')
      .click()
      .type('XPTO')
      .should('have.value', 'XPTO')

    cy.get('#lastName')
      .click()
      .type('Xavier')
      .should('have.value', 'Xavier')

    cy.get('#phone-checkbox')
      .click()

    cy.get('#email')
      .click()
      .type('xptoxavier@hotmail.com')
      .should('have.value', 'xptoxavier@hotmail.com')

    cy.get('#open-text-area')
      .click()
      .type('Teste de escrita do Cypress')
      .should('have.value', 'Teste de escrita do Cypress')

    cy.contains('button', 'Enviar')
      .click()
      .get('.error')
      .should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
      .click()
      .type('XPTO')
      .should('have.value', 'XPTO')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .click()
      .type('Xavier')
      .should('have.value', 'Xavier')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .click()
      .type('xptoxavier@hotmail.com')
      .should('have.value', 'xptoxavier@hotmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .click()
      .type('5684712')
      .should('have.value', '5684712')
      .clear()
      .should('have.value', '')

  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar')
      .click()
      .get('.error')
      .should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', function () {
    cy.fillMandatoryFieldsAndSubmit()
    .get('.success').should('be.visible')
  })
})