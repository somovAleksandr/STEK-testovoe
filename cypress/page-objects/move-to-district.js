export function moveToDistrict() {
  cy.get('[data-test-id="Адресный фонд"]').should("be.visible");
  cy.get('[data-test-id="Адресный фонд"]').click();

  cy.get('[data-test-id="Адреса проживающих"]').should("be.visible");
  cy.get('[data-test-id="Адреса проживающих"]').click();

  cy.get('[data-cy="btn-add"]').should("be.visible");
  cy.get('[data-cy="btn-add"]').click();

  cy.get('[data-cy="stack-menu-list"]')
    .contains("div", "Район")
    .should("be.visible")
    .click();
}
