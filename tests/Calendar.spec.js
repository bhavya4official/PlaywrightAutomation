import {test, expect} from "@playwright/test";

test("Calendar validation", async ({page})=>{
    const date = "28";
    const monthNumber = "2";
    const year = "2024";
    const expectedList = [monthNumber, date, year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    /* Open Calendar popup */
    await page.locator(".react-date-picker__calendar-button").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();

    const allDates = page.locator("//abbr[text()='"+date+"']");
    await allDates.filter({hasNot: page.locator('.react-calendar__month-view__days__day--neighboringMonth')}).click(); // Wants to remove dates of neighboring months
    
    /* Assertion for selected date */
    const selectedDate = await page.locator(".react-date-picker__inputGroup > input[name='date']").getAttribute('value');
    console.log("D> "+ selectedDate);
    await expect(selectedDate.includes(year), "Verify selected date").toBeTruthy();
    // await expect(page.locator(".react-date-picker__inputGroup > input[name='date']")).toHaveAttribute('value', `${year}-0${monthNumber}-0${date}`);

    await expect(page.locator('input[name="month"]'), 'Verify month').toHaveValue(monthNumber); // CodeGen assertions
    await expect(page.locator('input[name="day"]')).toHaveValue(date);
    await expect(page.locator('input[name="year"]')).toHaveValue(year);

    // const inputDate = await page.locator(".react-date-picker__inputGroup input"); // Verifying through iteration
    // console.log("1> "+inputDate);
    // for(let i=0; i<inputDate.length; i++) {
    //     expect(inputDate[i].getAttribute('value')).toEqual(expectedList[i]);
    //     console.log("2> "+inputDate[i]);
    // }

    // const inputs = await page.locator(".react-date-picker__inputGroup input"); // Course code
    // for (let index = 0; index <inputs.length; index++)
    // {
    //     const value =inputs[index].getAttribute("value");
    //     expect(value).toEqual(expectedList[index]);
    //     console.log("2> "+inputs[i]+" "+expectedList[index]);
    // }

})