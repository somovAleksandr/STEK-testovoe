import "./commands";

Cypress.on("uncaught:exception", (err, runnable) => {
  const knownInitErrors = [
    "Cannot access 'pi4' before initialization",
    "Cannot access 'ni4' before initialization",
    "Cannot access 'Xe' before initialization",
  ];

  if (knownInitErrors.some((msg) => err.message.includes(msg))) {
    return false;
  }
});
