import { Page, expect } from "@playwright/test"
import BasePage from "./_basePage.js"
import { homePageSelectors, accountPageSelectors, searchResultSelectors, PdpSelectors, cartPage, checkoutPage } from "../../params.js"
import { signUpData } from "../../test-data/testData_account.js"

export default class HomePage extends BasePage {
    constructor(public page: Page) {
        super(page)
    }
    private productTextSearchResult: string

    async searchForProduct(product: string) {
        const expectedProducts = ["shirt", "mug"]
        await expect(expectedProducts).toContain(product)
        await this.page.locator(homePageSelectors.searchCatalaogInputField).click()
        await this.page.locator(homePageSelectors.searchCatalaogInputField).fill(product)
        await this.page.locator(homePageSelectors.searchCatalaogInputField).press("Enter")
        this.productTextSearchResult = (await this.page.locator(searchResultSelectors.searchResults).nth(1).textContent()) as string
        console.log(this.productTextSearchResult)
        await this.page.locator(searchResultSelectors.searchResults).nth(1).click()

        // await this.page.locator(searchResultSelectors.searchResults).nth(1).hover()
        // await this.page.locator(".quick-view").nth(1).click()
        await this.page.locator(PdpSelectors.productTitle).waitFor({ state: "visible" })
    }

    async add2cartPDP() {
        const productTitle = await this.page.locator(PdpSelectors.productTitle).textContent()
        expect(await this.page.locator(PdpSelectors.productTitle)).toContainText(this.productTextSearchResult)
        await expect(productTitle).toContain(this.productTextSearchResult)
        await this.page.locator(PdpSelectors.addToCart).click()
        await this.page.locator("#myModalLabel").waitFor({ state: "visible" })
        await this.page.locator("div a.btn").click()
        await this.page.locator(cartPage.shoppingCartTitle).waitFor({ state: "visible" })
        await this.page.locator(cartPage.addToCart).click()
    }

    async fillInCheckoutForm() {
        await this.page.getByLabel("Mr.").check()
        await this.page.locator(accountPageSelectors.createAccount.firstNameField).fill(signUpData.firstName)
        await this.page.locator(accountPageSelectors.createAccount.lastNameField).fill(signUpData.lastName)
        const randomEmailAddress = await this.generateRandomEmail() // hier doen we this. omdat we hebben dit gedfined in de basepage en dat is global scope.
        console.log(randomEmailAddress)
        await this.page.locator(accountPageSelectors.createAccount.emailField).fill(randomEmailAddress)
        // await this.page.locator(accountPageSelectors.createAccount.passwordField).nth(0).fill(signUpData.password)
        // await this.page.locator(accountPageSelectors.createAccount.DOBField).fill(signUpData.DOB)
        // await this.page.getByLabel("Sign up for our newsletter").check()
        await this.page.locator(checkoutPage.continuePersonalInfoCTA).click()
        // await this.page.locator(checkoutPage.continueCTA).click()
    }
}
