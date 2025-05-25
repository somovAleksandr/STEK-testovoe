export function clickRowByLabel(label) {
  cy.get("table").contains("tr", label).should("be.visible").click();
}
