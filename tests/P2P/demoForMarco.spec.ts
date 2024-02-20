import { test, expect, request } from "@playwright/test"

const loginPayload = { email: "administrator-cfto@pp-group.eu", password: "WDoDc#On37HkT7n", remember: false }
let token

test.beforeAll(async () => {
    const apiContext = await request.newContext()
    const loginRepsonse = await apiContext.post("https://p2p.acceptatie.pp-group.eu/api/api/auth/login", { data: loginPayload })

    expect((await loginRepsonse).ok()).toBeTruthy()

    const loginReponseJson = await loginRepsonse.json()
    token = loginReponseJson.token
    console.log(token)
})

// test.beforeEach(async ({ page }) => {
//     // await page.goto("https://p2p.acceptatie.pp-group.eu/")
//     // await page.fill("cap-input[data-test='email'] input", "administrator-cfto@pp-group.eu")
//     // await page.fill("cap-input.cap-password input", "WDoDc#On37HkT7n")
//     // await page.click("button[type='submit']")
//     await page.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/dashboard")
// })

test("Filter selection of companies", async ({ page }) => {
    await page.addInitScript((value) => {
        window.localStorage.setItem("token", value)
    }, token)
    // await page.addInitScript((user) => {
    //     window.localStorage.setItem("user", JSON.parse(user))
    // }, JSON.stringify(user))

    await page.goto("https://p2p.acceptatie.pp-group.eu/#/admin/dashboard")
    console.log(await page.evaluate(() => window.localStorage.getItem("token")))
    await page.click("a[href='#/admin/invoices/inbox']")
    await page.locator(".cap-table-filters").getByText("company").click()
    const companyDropDownFieldFirstSelection = page.locator("li[aria-label='520-TRAD BC14-TEST']")
    await companyDropDownFieldFirstSelection.click()
    await expect(companyDropDownFieldFirstSelection).toHaveClass("p-ripple p-element p-multiselect-item p-highlight")
    await page.click("div.p-multiselect-footer button")
    let companyText = await page.locator(".row-divider [data-test='table_cell_company.name'] .td-value").nth(0).textContent()
    await expect(companyText).toContain("520-TRAD BC14-TEST")
    await page.locator("i.fa-trash-alt").click()
    await page.locator(".cap-table-filters").getByText("company").click()
    const companyDropDownFieldSecondSelection = page.locator("li[aria-label='C020-Heiploeg International BV']")
    await companyDropDownFieldSecondSelection.click()
    await expect(companyDropDownFieldSecondSelection).toHaveClass("p-ripple p-element p-multiselect-item p-highlight")
    await page.click("div.p-multiselect-footer button")
    await page.waitForLoadState("domcontentloaded")
    await page.locator("i.fa-trash-alt").isVisible()
    const firstCompanyRow = page.locator(".row-divider [data-test='table_cell_company.name'] .td-value").nth(0)
    await firstCompanyRow.waitFor()
    await page.waitForTimeout(5000)
    companyText = await page.locator(".row-divider [data-test='table_cell_company.name'] .td-value").nth(0).textContent()
    await expect(companyText).toContain(" C020-Heiploeg International BV ")
})

test("Filter selection of supplier", async ({ page }) => {
    await page.click("a[href='#/admin/invoices/inbox']")
    await page.locator(".cap-table-filters").getByText("company").click()
})

// nog een keer met een andere company

// eentje met een supplier

// testje bouwen waar je invoice invult

// kijk als je nog een validatie erin kan krijgen

// test("fubar", async ({ page }) => {
//     await page.goto("https://p2p.acceptatie.pp-group.eu/#/admin/dashboard")
//     await page.click("a[href='#/admin/invoices/inbox']")
//     await page.locator(".cap-table-filters").getByText("company").click()
//     const companyDropDownField = page.locator("li[aria-label='520-TRAD BC14-TEST']")
//     await companyDropDownField.click()
//     await expect(companyDropDownField).toHaveClass("p-ripple p-element p-multiselect-item p-highlight")
//     await page.click("div.p-multiselect-footer button")
//     const companyText = await page.locator(".row-divider [data-test='table_cell_company.name'] .td-value").nth(0).textContent()
//     await expect(companyText).toContain("520-TRAD BC14-TEST")
//     await page.locator("i.fa-trash-alt").click()
// })
