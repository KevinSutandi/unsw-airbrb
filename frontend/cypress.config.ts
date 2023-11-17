import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    testIsolation: false,
    baseUrl: 'http://localhost:1234',
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
})
