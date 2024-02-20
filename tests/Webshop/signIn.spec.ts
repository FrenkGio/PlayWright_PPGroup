import { test, expect } from "@playwright/test"
import { homePageSelectors, accountPageSelectors, buttonGetByRole } from "../../params"
import { loginData } from "../../test-data/testData_account"
import AccountPage from "../../pageobjects/smartQA_Webshop/accountPage"
import HomePage from "../../pageobjects/smartQA_Webshop/homePage"

test.beforeEach(async ({ page }) => {
    await page.goto("https://webshop.mobiletestautomation.nl/")
    await expect(page).toHaveTitle(/SQA Test Automation/)
})

test("As a user I want to sign into my account ", async ({ page }) => {
    const account = new AccountPage(page) // Ik kan dit niet als globale locator maken, doe ook maar wat soms, waarom kan dat niet ?

    await page.click(homePageSelectors.signInButton)
    await page.fill(accountPageSelectors.emailField, loginData.email)
    await page.fill(accountPageSelectors.passwordField, loginData.password)
    // await account.getButtonByRole(page, "Sign In") // DEZE WERKT
    await (await account.buttonGetByRole("Sign in")).click() // DEZE WERKT OOK
    // await buttonGetByRole(page, "Sign In").click() // WERKT OOK ALS EXPORT FUNCTIE, wat is verschil dan met promise zoals hierboven
    await expect(page.locator(accountPageSelectors.signedInUser)).toHaveText(/Dan\s*Tester/)
    await expect(page.locator(accountPageSelectors.signOutButton)).toBeVisible
})

test("As a user I want to be able to create an account", async ({ page }) => {
    const account = new AccountPage(page)
    await page.click(homePageSelectors.signInButton)
    await account.createNewAccount()
    await expect(page.locator(accountPageSelectors.signedInUser)).toHaveText(/Dan\s*Tetser/)
    await expect(page.locator(accountPageSelectors.signOutButton)).toBeVisible()
})

test("As a user I want to be able to search for a product and buy it", async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.searchForProduct("mug")
    await homePage.add2cartPDP()
    await homePage.fillInCheckoutForm()
})
