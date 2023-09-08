/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', function () {
    cy.clock()

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

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.clock()

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

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })
  it('testando se o campo telefone aceita letras', function () {
    cy.get('#phone')
      .click()
      .type('XPTO')

  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.clock()

    cy.get('#firstName')
      .click()
      .type('XPTO')
      .should('have.value', 'XPTO')

    cy.get('#lastName')
      .click()
      .type('Xavier')
      .should('have.value', 'Xavier')

    cy.get('#phone-checkbox')
      .check()
      .should('be.checked')

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

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
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
    cy.clock()
    cy.contains('button', 'Enviar')
      .click()
      .get('.error')
      .should('be.visible')
    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })
  Cypress._.times(3, function () {
    it('envia o formuário com sucesso usando um comando customizado', function () {
      cy.clock()
      cy.fillMandatoryFieldsAndSubmit()
        .get('.success').should('be.visible') 
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')
    })
  })

  it('Seleciona o produto "Youtube" por seu texto', function () {
    cy.get('select')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  it('seleciona um produto (Mentoria) por seu valor (value)', function () {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  it('seleciona um produto (Blog) por seu índice', function () {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', function () {
    cy.get('input[type=radio][value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })
  it('marca cada tipo de atendimento', function () {
    cy.get('input[type=radio]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })
  it('marca ambos checkboxes, depois desmarca o último', function () {
    cy.get('input[type=checkbox]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json', { enconding: null }).as('exampleFile')
    cy.get('input[type="file"]')
      .selectFile({
        contents: '@exampleFile',
        fileName: 'example.json'
      })
      .then(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })
  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function() {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')

    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
  it('preenche a area de texto usando o comando invoke', function() {
    const text = Cypress._.repeat('XPTO ', 15)
    cy.get('#open-text-area')
      .invoke('val', text)
      .should('have.value', text)
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target', '_blank')
      .click()
  })
  it('faz uma requisição HTTP', function() {
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should(function(response) {
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).include('CAC TAT')
      })
  })
})
