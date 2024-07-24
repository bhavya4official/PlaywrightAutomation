const { devices } = require("@playwright/test"); //importing package

const config = {
  /* Look for test files in the "tests" directory, relative to this configuration file. */
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expact: { //timeout for all assertion
    timeout: 5000,
  },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  /* Shared settings for all the projects below. */
  use: {
    browserName: "webkit",
    headless: false, //Run the test in head/headless browser mode
  },
};
module.exports = config;

/* Run test command -
npx- Node Package Execute (npm package runner - that can execute any package from the npm registry without ever installing it)
npx playwright test (npx automatically find playwright module from node_modules & find config file & trigger testDir)
*/

/* Run test in head mode
npx playwright test --headed

Explicitly tell playwright to run in headed (browser mode)
By default playwright run the test in headless browser mode (browser will not open)
*/
