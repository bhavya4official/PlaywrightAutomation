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
    browserName: "chromium",
    headless: true, // Run the test in head/headless browser mode
    screenshot: "only-on-failure", // Screenshot setting modes are "off"|"on"|"only-on-failure"
    trace: "retain-on-failure", // 'retain-on-failure' capure logs for failure steps | mode 'on' will capture the logs of each steps
  },

  /* True - configure entire project to have all tests in all files to run in parallel */
  fullyParallel: false, // or use test.describe.configure({ mode: 'parallel' }); in test file
  // Parallel tests are executed in separate worker processes and cannot share any state or global variables.

  // This config option limit the number of failures on CI to save resources
  maxFailures: process.env.CI ? 10 : undefined,
};
module.exports = config;

/* Run test command -
npx- Node Package Execute (npm package runner - that can execute any package from the npm registry without ever installing it)
npx playwright test (npx automatically find playwright module from node_modules & find config file & trigger testDir)
*/

/* 
Playwright test options passed to the command line take priority over the configuration file.

npx playwright test --headed
To run test in head mode use --headed command line flag
Explicitly tell playwright to run in headed (browser mode)
By default playwright run the test in headless browser mode (browser will not open)

npx playwright test --grep / -g "Maching String"  
Using OR operator "@fast | @slow"
Sring regular expression will match project name, test file name, test.describe titles, test title and all test tags.

npx playwright test --max-failures=10
This flag limit the number of failed tests in the whole test suite to avoid wasting resources on broken test suites/build.

npx playwright test --shard=1/4  (Split the suite into four shards, each machine running one fourth of the tests)
Sharding (mode of operation to partition/split test suit) - Running tests on multiple machines simultaneously
Playwright will shard test files only

npx playwright test --debug
Launch Playwright inspector, Trace viewer - To start test in debug mode - execute step by step
Use Explore option in Playwright inspector to inpect element & auto-genereate or validate CSS selector

npx playwright test --ui
UI Test Runner - 

npx playwright codegen google.com (URL is optional)
Launch codegen tool - 'Record & Playback' feature to auto-generate automation script for Actions & Assertions
*/
