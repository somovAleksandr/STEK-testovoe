export function cleanup(label) {
  cy.contains("td", label)
    .parents("tr")
    .find('[data-cy="checkbox"]')
    .check({ force: true });

  cy.get('[data-cy="btn-delete"]').should("be.visible").click();
  cy.get('[data-cy="stack-dialog"]').should("be.visible");
  cy.get('[data-cy="btn-yes"]').should("be.visible").click();
}
