# Playwright Automation Testing Demo

**Playwright is a framework for Web Testing and Automation developed by Microsoft and launched on _31 January 2020._**
**It provides the ability to automate browser tasks in Chromium, Firefox and WebKit with a single API.**
**Playwright is built to enable cross-browser end-to-end testing for modern web apps, that is ever-green, capable, reliable and fast.**


### Get started:
1. Initialize playwright project in folder

    /folderpath/`npm init playwright@latest`

2. Run using Node Package Runner in headed mode

    `npx playwright test --headed`

3. HTML test report (Default)

    `npx playwright show-report`


### Playwright Advantages:

1. Reliable E2E testing

   `Auto-wait capability` for reliable E2E modern web app testing. (retry mechanism)

2. Cross-browser compatibility

   `Chromium-based` (Chrome, Edge, Opera) `Firefox` `WebKit` (Safari)

3. Multipaltform support

   `Windows` `macOS` `Linux`
   Also support native mobile emulation `Google Chrome on Android` & `Safari on iOS`

4. Multilingual Flexibility

   Language bindings for `JS` `TypeScript` `Java` `Python` `C# (.Net)`


### Playwright Advanced Features:

1. Tracking & Debugging

   `Automatic SS` `Test video recording` `Comprehensive Logging`

2. Network Interception

   `API testing libraries` to intercept & validate network calls.

3. Browser Context Management

   `Save & transfer browser state` across test suite.

4. Codegen tool

   `Auto-generate test code` by recording user actions.


> Playwright suggests using CSS locator instead of XPath.

### CSS Selectors:

1. If id is present

   `#id` | `tagname#id`

2. If class name is present

   `.class` | `tagname.class`

3. Generate CSS selector based on attribute

   `[attribute='value']` `tagname[attribut='value']`
   (With regEx -> `[attribute*='val']`)

4. Traversing from parent to child element

   `parentTagName childTagName`

5. Based on text

   `text='abc'` | `tag:has-text='abc'`

6. Using psudo class

   `tagName:psudo-method='value'`



🧑🏻‍💻 **Udemy course:** [Playwright Automation Testing from Scratch with Framework](https://www.udemy.com/course/playwright-tutorials-automation-testing/)
