import { test, expect } from "@playwright/test"

export const myTest = test.extend({
    pageP2P: async ({ page }, use) => {
        await page.goto("https://p2p.acceptatie.pp-group.eu/")
        await page.fill("cap-input[data-test='email'] input", "administrator-cfto@pp-group.eu")
        await page.fill("cap-input.cap-password input", "WDoDc#On37HkT7n")
        await page.click("button[type='submit']")
        await page.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/dashboard")
        const visibleElement = await page.locator("div.cap-power-bi-report").isVisible()
        console.log("eerste dashboard log", visibleElement)
        await expect(page.locator("div.cap-power-bi-report")).toBeVisible()
        await page.locator("div.cap-power-bi-report").waitFor({ state: "visible" }) // hier geeft hij error als je geen state doet, op de andere page helemaal niets..
        await use(page)
    },
})
