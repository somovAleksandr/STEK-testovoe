const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demo.app.stack-it.ru/fl ",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
