#Playwright Automation Testing Demo

"""Playwright is a framework for Web Testing and Automation developed by Microsoft and launched on 31 January 2020.
It provides the ability to automate browser tasks in Chromium, Firefox and WebKit with a single API.
Playwright is built to enable cross-browser end-to-end testing for modern web apps that is ever-green, capable, reliable and fast.

"""Playwright suggest to use CSS locator instead of XPath.

##CSS Selectors:

1. If id is present
   #id | tagname#id

2. If class name is present
   .class | tagname.class

3. Generate css selector based on attribute
   [attribute='value']
   (With regEx -> attribute\*='val')

4. Traversing from parent to child element
   parentTagName childTagName

5. Based on text
   text='abc' | tag:has-text='abc'
