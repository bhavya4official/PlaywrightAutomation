const { devices } = require("@playwright/test"); //importing package
const { retries } = require("./original_playwright.config");

const config = {
    /* Look for test files in the "tests" directory, relative to this configuration file. */
    testDir: "./tests",
    // retries: 1, // Retry failed TC 1 time - To resolve 'Race condition' - helpful when flacky test present
    // workers: 1, // Disable file parallel execution mechanism

    /* Maximum time one test can run for. [Default: 30s] */
    timeout: 30 * 1000,
    expect: {
        //timeout for all assertion
        timeout: 5000,
    },

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",

    /* Shared settings for all the projects below. */
    use: {
        browserName: "firefox", // chromium | firefox | webKit
        headless: true, // Run the test in head/headless browser mode
        screenshot: "only-on-failure", // Screenshot setting modes are "off"|"on"|"only-on-failure"
        video: 'off',
        trace: "retain-on-failure", // 'retain-on-failure' capure logs for failure steps | mode 'on' will capture the logs of each steps
        // viewport: { width: 720, hight: 720 },
        // ignoreHTTPSErrors: 'true',
        Permissions: ['geolocation'], // Load browser with certian permissions ON
    },

    /* True - configure entire project to have all tests in all files to run in parallel */
    fullyParallel: false, // or use test.describe.configure({ mode: 'parallel' }); in test file
    // Parallel tests are executed in separate worker processes and cannot share any state or global variables.

    // This config option limit the number of failures on CI to save resources
    maxFailures: process.env.CI ? 10 : undefined,
};
module.exports = config;

/* If want to debug from VS code (useful to debug API hooks) -> add below script in package.json file & increase timeout from config file
"scripts": {
    "test": "npx playwright test test/WebAPI.spec.js --headed" 
  },
  
Ctrl+Shift+P >Debug: Debug npm Script
*/