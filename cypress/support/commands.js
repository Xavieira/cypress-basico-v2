Cypress.Commands.add('fillMandatoryFieldsAndSubmit', user => {
    cy.get('#firstName').type('XPTO')
    cy.get('#lastName').type('Xavier')
    cy.get('#email').type('xptoxavier@hotmail.com')
    cy.get('#open-text-area').type('Teste de escrita do Cypress')
    cy.get('button[type="submit"]').click()
})