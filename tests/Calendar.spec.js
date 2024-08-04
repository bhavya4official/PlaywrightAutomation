import {test, expect} from "@playwright/test";

test.only("Calendar validation", async ({page})=>{
    const date = "7";
    const monthNumber = "2";
    const year = "2024";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    /* Open Calendar popup */
    await page.locator(".react-date-picker__calendar-button").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").filter({hasNot: page.locator('.react-calendar__month-view__days__day--neighboringMonth')}).click();
    
    console.log("D> "+ await page.locator(".react-date-picker__inputGroup > input[name='date']").getAttribute('value'));

    const selectedDate = await page.locator(".react-date-picker__inputGroup > input[name='date']").getAttribute('value');
    await expect(selectedDate.includes(year), "Verify selected date").toBeTruthy(); 
    // await expect(page.locator(".react-date-picker__inputGroup > input[name='date']")).toHaveAttribute('value', `${year}-0${monthNumber}-0${date}`);
})