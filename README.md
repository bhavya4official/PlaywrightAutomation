# Playwright Automation Testing Demo

**Playwright is a framework for Web Testing and Automation developed by Microsoft and launched on _31 January 2020._**
**It provides the ability to automate browser tasks in Chromium, Firefox and WebKit with a single API.**
**Playwright is built to enable cross-browser end-to-end testing for modern web apps, that is ever-green, capable, reliable and fast.**


### Get started:
1. Initialize playwright project in folder

    /folderpath/`npm init playwright@latest`

   `npx playwright install` (Install Playwright browsers manually)

3. Run using Node Package Execute/Runner in headed mode

    `npx playwright test --headed`

4. HTML test report (Default)

    `npx playwright show-report`
***

### Playwright Advantages:

1. Reliable E2E testing

   `Auto-wait capability` (Retry mechanism - automatically waits for the wide range of 'actionability checks' to pass before performing each action.)

2. Cross-browser compatibility

   `Chromium-based` (Chrome, Edge, Opera) `Firefox` `WebKit` (Safari)

3. Multipaltform support

   `Windows` `macOS` `Linux`
   Also support native mobile emulation `Google Chrome on Android` & `Safari on iOS`

4. Multilingual Flexibility

   Language bindings for `JS` `TypeScript` `Java` `Python` `C# (.Net)`
***

### Playwright Advanced Features:

1. Tracking & Debugging

   `Automatic SS` `Test video recording` `Comprehensive Logging`

2. Network Interception

   `API testing libraries` to intercept & validate network calls.

3. Browser Context Management

   `Save & transfer browser state` across test suite.

4. Codegen tool

   `Auto-generate test code` by recording user actions.
***

> Playwright suggests using CSS locator instead of XPath.

### CSS Locators to identify elements:

1. If id is present

   `#id` | `tagname#id`

2. If class name is present

   `.class` | `tagname.class`

3. Generate CSS selector based on attribute

   `[attribute='value']` `tagname[attribut='value']`
   (With regEx -> `[attribute*='val']`)

4. Traversing from parent to child element

   `parentTagName > childTagName` `.parentClassName .childClassName`

5. Based on text

   `text=abc` | `tag:has-text('abc')`

6. Using psudo class

   `tagName:psudo-method('value')`
***

### Test run commands
npx- Node Package Execute (npm package runner - that can execute any package from the npm registry without ever installing it)

`npx playwright test`

(npx automatically find playwright module from node_modules & find config file & trigger testDir)
 
Playwright test options passed to the command line take priority over the configuration file.

`npx playwright test --headed`

To run test in head mode use --headed command line flag
Explicitly tell playwright to run in headed (browser mode)
By default playwright run the test in headless browser mode (browser will not open)

`npx playwright test --grep / -g "Maching String"`  

Using OR operator "@fast | @slow"
Sring regular expression will match project name, test file name, test.describe titles, test title and all test tags.

`npx playwright test --max-failures=10`

This flag limit the number of failed tests in the whole test suite to avoid wasting resources on broken test suites/build.

`npx playwright test --shard=1/4`  (Split the suite into four shards, each machine running one fourth of the tests)

Sharding (mode of operation to partition/split test suit) - Running tests on multiple machines simultaneously
Playwright will shard test files only

`npx playwright test --debug`

Launch Playwright inspector, Trace viewer - To start test in debug mode - execute step by step
Use Explore option in Playwright inspector to inpect element & auto-genereate or validate CSS selector

`npx playwright test --ui`

UI Test Runner - 

`npx playwright codegen google.com (URL is optional)`

Launch codegen tool - 'Record & Playback' feature to auto-generate automation script for Actions & Assertions

***
🧑🏻‍💻 **Udemy course:** [Playwright Automation Testing from Scratch with Framework](https://www.udemy.com/course/playwright-tutorials-automation-testing/)
