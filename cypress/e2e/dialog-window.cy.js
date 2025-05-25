import { e2eLogin } from "../page-objects/auth";
import { moveToDistrict } from "../page-objects/move-to-district";
import { clickRowByLabel } from "../page-objects/click-row-by-label";
import { cleanup } from "../page-objects/click-row-by-label";

const login = "DEMOWEB";
const password = "awdrgy";
const disctrictName = "Ленина";
const numberInList = 15;

const getDistrictName = () => cy.get('[data-test-id="Название района"]');
const getNumberInList = () => cy.get('[data-test-id="Номер в списке"]');
const getAddParametrsButton = () => cy.get('[data-cy="btn-add"]');
const getSaveButton = () => cy.get('[data-cy="btn-save"]');

describe("dialog window", () => {
  beforeEach(() => {
    e2eLogin(login, password);
    moveToDistrict();
  });

  it("create district", () => {
    cy.intercept("POST", "**/kvpl").as("createKvpl");

    cy.get('[data-test-id="ЛицевыеСчета"]')
      .should("be.visible")
      .within(() => {
        getDistrictName().should("be.visible").type(disctrictName);
        getNumberInList().focus().clear().type(numberInList);
        getAddParametrsButton().should("be.visible").click();
      });

    cy.contains("Виды параметров").should("exist");
    clickRowByLabel("ТИПСТРОЙ");

    cy.get('[data-test-id="ЛицевыеСчета.Параметры"]')
      .should("be.visible")
      .within(() => {
        getSaveButton().should("be.visible").click();
      });

    cy.wait("@createKvpl").its("response.statusCode").should("eq", 200);

    cy.contains("Тип строения").should("exist");

    // "проверить что кнопка задисейблена, если ничего не выбрано в таблице"
    getSaveButton().should("be.disabled");
    cy.contains("td", "Тип строения")
      .parents("tr")
      .find('[data-cy="checkbox"]')
      .check({ force: true });

    getSaveButton().should("be.enabled").click();
    cy.wait("@createKvpl").its("response.statusCode").should("eq", 200);

    cleanup(disctrictName);
  });

  // Дальше решил писать название itов по-русски

  it("Проверка обязательных полей", () => {
    getSaveButton().click();
    cy.contains("div", "Поле не может быть пустым").should("be.visible");
    getSaveButton().should("be.disabled");
    getDistrictName().should("be.visible").type(disctrictName);
    cy.contains("div", "Поле не может быть пустым").should("not.exist");
    getSaveButton().should("be.enabled");

    getNumberInList().focus().clear();
    cy.contains("div", "Поле не может быть пустым").should("be.visible");
    getSaveButton().should("be.disabled");
    getNumberInList().focus().type(numberInList);
    cy.contains("div", "Поле не может быть пустым").should("not.exist");
    getSaveButton().should("be.enabled");
  });
});
