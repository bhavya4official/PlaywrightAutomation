const { devices } = require("@playwright/test"); //importing package
const { retries } = require("./original_playwright.config");

const config = {
    /* Look for test files in the "tests" directory, relative to this configuration file. */
    testDir: "./tests",
    // retries: 1, // Retry failed TC 1 time - To resolve 'Race condition' - helpful when flacky test present

    // workers: 1, // Disable file parallel execution mechanism [Default: All tests within a file run sequentially & test files run in parallel]

    fullyParallel: false, // or use test.describe.configure({ mode: 'parallel' }); in test file
    // True - configure entire project to have all tests in all files to run in parallel
    // Parallel tests are executed in separate worker processes and cannot share any state or global variables.

    // This config option limit the number of failures on CI to save resources
    maxFailures: process.env.CI ? 10 : undefined,
    
    /* Maximum time one test can run for. [Default: 30s] */
    timeout: 30 * 1000,
    expect: {
        //timeout for all assertion
        timeout: 5000,
    },

    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html", // line, list, dot, json, junit, html, null

    /*
    // Concise 'dot' reporter is default for CI, default 'list' when running locally
    reporter: process.env.CI ? 'dot' : 'list',
    */

    /* Shared settings for all the projects below. */
    use: {
        browserName: "firefox", // chromium | firefox | webKit
        headless: true, // Run the test in head/headless browser mode
        screenshot: "only-on-failure", // Screenshot setting modes are "off"|"on"|"only-on-failure"
        video: 'off',
        trace: "retain-on-failure", // 'retain-on-failure' capure logs for failure steps | mode 'on' will capture the logs of each steps | 'on-first-retry' Collect trace when retrying the failed test
        // Trace can be open in browser using command: npx playwright show-trace trace.zip or visit https://trace.playwright.dev & upload trace.zip file
        // viewport: { width: 720, hight: 720 },
        // ignoreHTTPSErrors: 'true',
        Permissions: ['geolocation'], // Load browser with certian permissions ON
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },

        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },

        {
            name: "safari",
            use: {
                browserName: 'webkit',
                headless: true,
                screenshot: 'off',
                video: 'off',
                trace: 'on',
                viewport: { width: 720, hight: 720 },
                ignoreHTTPSErrors: true, // To accept SSL certificate error & continue with test execution (when website is not secure HTTPS)
                Permissions: ['geolocation'], // Load browser with certian permissions ON
                ...devices["Desktop Safari"]
            },
        },

    ],

};
module.exports = config; // Make this config available to whole framework

/* If want to debug from VS code (useful to debug API hooks) -> add below script in package.json file & increase timeout from config file
"scripts": {
    "test": "npx playwright test test/WebAPI.spec.js --headed" 
  },
  
Ctrl+Shift+P >Debug: Debug npm Script
*/