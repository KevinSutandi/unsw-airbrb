<<<<<<< HEAD
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    testIsolation: false,
    baseUrl: 'http://localhost:3838',
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
})
=======
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      // implement node event listeners here
    },
  },
});
>>>>>>> 4d16a979ceb579eda1fcc7f26098047b975532fa
