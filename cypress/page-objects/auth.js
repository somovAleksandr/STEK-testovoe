export function e2eLogin(username, password) {
  cy.visit("/");

  // Ввод логина и пароля
  cy.get('[data-cy="login"]').should("be.visible").type(username);
  cy.get('[data-cy="password"]').type(password);
  cy.get('[data-cy="submit-btn"]').click();

  // Проверяем наличие модального окна после входа
  cy.get("body").then(($body) => {
    // Если есть модальное окно с текстом "Пользователь с таким именем уже вошел..."
    if ($body.find('[data-cy="stack-dialog"]').length > 0) {
      cy.get('[data-cy="stack-dialog"]')
        .should("be.visible")
        .within(() => {
          cy.contains(
            "Пользователь с таким именем уже вошел в систему."
          ).should("exist");
        });

      // Нажимаем кнопку "Да"
      cy.get('[data-cy="btn-yes"]').should("be.visible").click();
    }

    // Если есть модальное окно с data-cy="stack-yes-no"
    if ($body.find('[data-cy="stack-yes-no"]').length > 0) {
      cy.get('[data-cy="stack-yes-no"]')
        .should("be.visible")
        .within(() => {
          cy.get('[data-cy="btn-yes"]').should("be.visible").click();
        });
    }
  });
}
