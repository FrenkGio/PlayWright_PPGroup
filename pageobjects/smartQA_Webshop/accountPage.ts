import { Page } from "@playwright/test"
import BasePage from "./_basePage.js"
import { homePageSelectors, accountPageSelectors } from "../../params.js"
import { signUpData } from "../../test-data/testData_account.js"

export default class AccountPage extends BasePage {
    constructor(public page: Page) {
        super(page)
    }

    async createNewAccount() {
        await this.page.click(accountPageSelectors.createNewAccountLink)
        await this.page.goto("https://webshop.mobiletestautomation.nl/")
        // await (await this.getByRoleDynamic("link", " Sign in")).click()  // dit werkt ook voor dynamic, maar is onnodige hassle
        await this.page.getByRole("link", { name: " Sign in" }).click()
        await this.page.getByRole("link", { name: "No account? Create one here" }).click()
        await this.page.getByLabel("Mr.").check()
        await this.page.locator(accountPageSelectors.createAccount.firstNameField).fill(signUpData.firstName)
        await this.page.locator(accountPageSelectors.createAccount.lastNameField).fill(signUpData.lastName)
        const randomEmailAddress = await this.generateRandomEmail() // hier doen we this. omdat we hebben dit gedfined in de basepage en dat is global scope.
        console.log(randomEmailAddress)
        await this.page.locator(accountPageSelectors.createAccount.emailField).fill(randomEmailAddress)
        await this.page.locator(accountPageSelectors.createAccount.passwordField).fill(signUpData.password)
        await this.page.locator(accountPageSelectors.createAccount.DOBField).fill(signUpData.DOB)
        await this.page.getByLabel("Sign up for our newsletter").check()
        await this.page.locator(accountPageSelectors.createAccount.saveButton).click()
    }
}
