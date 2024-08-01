const { devices } = require("@playwright/test"); //importing package

const config = {
  /* Look for test files in the "tests" directory, relative to this configuration file. */
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    //timeout for all assertion
    timeout: 5000,
  },

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",

  /* Shared settings for all the projects below. */
  use: {
    browserName: "webkit",
    headless: true, //Run the test in head/headless browser mode
    screenshot: "on",
    trace: "retain-on-failure", //Value 'on' will capture the logs of each steps
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

npx playwright test --debug
Launch Playwright inspector, Trace viewer - To start test in debug mode - execute step by step
Use Explore option in Playwright inspector to inpect element & auto-genereate or validate CSS selector

npx playwright codegen https:www.google.com (or google.com)
Launch codegen tool - 'Record & Playback' feature to auto-generate automation script
*/
