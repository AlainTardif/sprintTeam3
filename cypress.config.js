import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '9n8azo',
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
