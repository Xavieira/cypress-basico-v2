Cypress.Commands.add('fillMandatoryFieldsAndSubmit', user => {
    cy.get('#firstName')
        .click()
        .type('XPTO')
        .should('have.value', 'XPTO')

    cy.get('#lastName')
        .click()
        .type('Xavier')
        .should('have.value', 'Xavier')

    cy.get('#email')
        .click()
        .type('xptoxavier@hotmail.com')
        .should('have.value', 'xptoxavier@hotmail.com')

    cy.get('#phone')
        .click()
        .type('5684712')
        .should('have.value', '5684712')

    cy.get('#open-text-area')
        .click()
        .type('Teste de escrita do Cypress')
        .should('have.value', 'Teste de escrita do Cypress')

    cy.get('.button')
        .click()
        .get('.success')
        .should('be.visible')
})
