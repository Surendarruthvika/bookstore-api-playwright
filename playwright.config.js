const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 30000,
  retries: 1,
  reporter: [['list'], ['allure-playwright']],
  use: {
    baseURL: process.env.BASE_URL,
  },
});
