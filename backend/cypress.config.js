require("dotenv").config({ path: "./.env" });
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: `http://localhost:${process.env.PORT}`,
  },

  env: {
    testUrl: `http://localhost:${process.env.PORT}`
  }
});
