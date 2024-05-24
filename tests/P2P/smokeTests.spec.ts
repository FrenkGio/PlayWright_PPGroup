import { test, expect, request } from "@playwright/test"
import BasePage from "../../pageobjects/P2P/_basePage"
import { myTest } from "./Fixtures/baseFixtures"
import { dataTable, genericFilters, navigationBarSelectors } from "../../paramsP2P"

let dataTableRowText, companyName, selectedCompany, supplierName, selectedSupplier, menuItem

myTest("Filter selection of companies in inbox", async ({ pageP2P }) => {
    const basePage = new BasePage(pageP2P)

    await pageP2P.click(navigationBarSelectors.inbox)
    await pageP2P.locator(genericFilters.capTableFilters.capTable).getByText("company").click()
    companyName = "520-TRAD BC14-TEST"
    selectedCompany = await pageP2P.locator(genericFilters.dropdownField.filterSelection(companyName))
    await selectedCompany.click()
    await expect(selectedCompany).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    await pageP2P.locator(genericFilters.dropdownField.applyFilter).click()
    await basePage.waitForFirstRowToLoad()
    dataTableRowText = await basePage.getTableFirstRowText("company")
    await expect(dataTableRowText).toContain(companyName)
    await pageP2P.locator(genericFilters.capTableFilters.trashCanButton).click()
    await basePage.waitForFirstRowToLoad()
    companyName = "C020-Heiploeg International BV"
    await pageP2P.locator(genericFilters.capTableFilters.capTable).getByText("company").click()
    selectedCompany = await pageP2P.locator(genericFilters.dropdownField.filterSelection(companyName))
    await selectedCompany.click()
    await expect(selectedCompany).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    await pageP2P.locator(genericFilters.dropdownField.applyFilter).click()
    await basePage.waitForFirstRowToLoad()
    dataTableRowText = await basePage.getTableFirstRowText("company")
    await expect(dataTableRowText).toContain(companyName)
})

myTest("Filter selection of supplier in Inbox", async ({ pageP2P }) => {
    const basePage = new BasePage(pageP2P)

    await pageP2P.click(navigationBarSelectors.inbox)
    await pageP2P.locator(genericFilters.capTableFilters.capTable).getByText("supplier").click()
    supplierName = "FIDAL"
    await pageP2P.locator(genericFilters.dropdownField.DropdownSearchEntryField).fill(supplierName, { delay: 500 })
    selectedSupplier = await pageP2P.locator(genericFilters.dropdownField.filterSelection(supplierName))
    selectedSupplier.click()
    await expect(selectedSupplier).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    await pageP2P.locator(genericFilters.dropdownField.applyFilter).click()
    await basePage.waitForFirstRowToLoad()
    dataTableRowText = await basePage.getTableFirstRowText("supplier")
    await expect(dataTableRowText).toContain("FIDAL")
})

myTest("Filter selection of companies in Invoice history", async ({ pageP2P }) => {
    const basePage = new BasePage(pageP2P)

    await pageP2P.locator("a[href='#/admin/invoices/list']").click()
    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/invoices/list")
    await pageP2P.locator(genericFilters.capTableFilters.capTable).getByText("company").click()
    companyName = "520-TRAD BC14-TEST"
    selectedCompany = await pageP2P.locator(genericFilters.dropdownField.filterSelection(companyName))
    await selectedCompany.click()
    await expect(selectedCompany).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    await pageP2P.locator(genericFilters.dropdownField.applyFilter).click()
    await basePage.waitForFirstRowToLoad()
    dataTableRowText = await basePage.getTableFirstRowText("company")
    await expect(dataTableRowText).toContain(companyName)
})

myTest("Filter selection of company in Sync issues", async ({ pageP2P }) => {
    const basePage = new BasePage(pageP2P)

    await pageP2P.locator("a[href='#/admin/sync-errors/list']").click()
    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/sync-errors/list")
    await pageP2P.locator(genericFilters.capTableFilters.capTable).getByText("company").click()
    companyName = "520-TRAD BC14-TEST"
    selectedCompany = await pageP2P.locator(genericFilters.dropdownField.filterSelection(companyName))
    await selectedCompany.click()
    await expect(selectedCompany).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    await pageP2P.locator(genericFilters.dropdownField.applyFilter).click()
    await basePage.waitForFirstRowToLoad()
    dataTableRowText = await basePage.getTableFirstRowText("company")
    await expect(dataTableRowText).toContain(companyName)
    await expect(pageP2P.locator(".divider i.fas").first()).toHaveClass("fas fa-link")
})

myTest("Filter selection of company and status in Contracts", async ({ pageP2P }) => {
    const basePage = new BasePage(pageP2P)

    await pageP2P.locator("a[href='#/admin/contracts/list']").click()
    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/contracts/list")
    // await pageP2P.locator(genericFilters.capTableFilters.capTable).getByText("Companies").click()
    // companyName = "520-TRAD BC14-TEST"
    // selectedCompany = await pageP2P.locator(genericFilters.dropdownField.filterSelection(companyName))
    // await selectedCompany.click()
    // await expect(selectedCompany).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    // await pageP2P.locator(genericFilters.dropdownField.applyFilter).click()
    // await basePage.waitForFirstRowToLoad()
    await pageP2P.locator(genericFilters.capTableFilters.capTable).getByText("Status").click()
    const status = "Active"
    const selectedStatus = await pageP2P.locator(genericFilters.dropdownField.filterSelection(status))
    await selectedStatus.click()
    await expect(selectedStatus).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    await pageP2P.locator(genericFilters.dropdownField.applyFilter).click()
    await basePage.waitForFirstRowToLoad()
    // dataTableRowText = await basePage.getTableFirstRowText("company")
    // await expect(dataTableRowText).toContain(companyName)
    dataTableRowText = await basePage.getTableFirstRowText("statusContracts")
    await expect(dataTableRowText).toContain(status)
})

myTest("Search for an invoice through search field", async ({ pageP2P }) => {
    const basePage = new BasePage(pageP2P)
    const invoiceNo = "2201641"
    companyName = " SMARTQA-TEST "

    await pageP2P.locator("nav .search input[placeholder='Search...']").fill(invoiceNo, { delay: 500 })
    await pageP2P.locator("nav .search button").click()
    await pageP2P.waitForURL(/https:\/\/p2p\.acceptatie\.pp-group\.eu\/#\/admin\/invoices\/search\?query=/)
    await basePage.waitForFirstRowToLoad()
    dataTableRowText = await basePage.getTableFirstRowText("company")
    await expect(dataTableRowText).toContain(companyName)
    dataTableRowText = await basePage.getTableFirstRowText("invoiceNo")
    await expect(dataTableRowText).toContain(invoiceNo)
})

myTest("User navigates to the settings page adjusts a company's profile", async ({ pageP2P }) => {
    const basePage = new BasePage(pageP2P)
    companyName = "SMARTQA-TEST"
    menuItem = "Settings"

    await pageP2P.locator(".menu-item .menu-icon .fa-ellipsis-v").click()
    const selectedMenuItem = await pageP2P.locator(genericFilters.dropdownField.filterSelection(menuItem))
    await selectedMenuItem.click()
    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/manage")
    await pageP2P.getByText("Companies").click()
    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/companies/list")
    await pageP2P.locator(genericFilters.capTableFilters.searchEntryField).first().fill(companyName, { delay: 500 })
    await basePage.waitForFirstRowToLoad()
    dataTableRowText = await basePage.getTableFirstRowText("name")
    await expect(dataTableRowText).toContain(companyName)
    await pageP2P.locator(".fa-pencil-alt").click()
    const h1Headlinelocator = pageP2P.locator("h1.headline__title")
    await expect(h1Headlinelocator).toContainText(companyName)

    const isActiveSlider = await pageP2P.locator("cap-input-switch p-inputswitch")
    await pageP2P.waitForTimeout(1500)
    await isActiveSlider.waitFor()
    await expect(await pageP2P.locator("cap-input-switch p-inputswitch div").first()).toHaveClass(/p-inputswitch-checked/)
    await isActiveSlider.click()
    await isActiveSlider.waitFor()
    await expect(await pageP2P.locator("cap-input-switch p-inputswitch div").first()).not.toHaveClass(/p-inputswitch-checked/)
    await isActiveSlider.click()
    await isActiveSlider.waitFor()
    await expect(await pageP2P.locator("cap-input-switch p-inputswitch div").first()).toHaveClass(/p-inputswitch-checked/)
    await isActiveSlider.waitFor()
    await pageP2P.getByText("Individual final approver settings").click()
    await pageP2P.getByText("Add condition").first().click()
    await pageP2P.locator("div[formarrayname='companyFinalApproverConditions'] span.p-dropdown-label").nth(0).click()
    await pageP2P.locator("li[aria-label='supplier']").click()
    await pageP2P.locator("cap-dropdown[formcontrolname='operator_class'] p-dropdown.p-element").click()
    await pageP2P.locator("li[aria-label='Equals']").waitFor()
    await pageP2P.locator("li[aria-label='Equals']").click()
    await pageP2P.waitForTimeout(2000)
})

myTest("User navigates to the settings page and adjusts a user's profile ", async ({ pageP2P }) => {
    const basePage = new BasePage(pageP2P)
    menuItem = "Settings"
    let userFirstName = "Franke"
    let userLastName = "Tesler"

    await pageP2P.locator(".menu-item .menu-icon .fa-ellipsis-v").click()
    const selectedMenuItem = await pageP2P.locator(genericFilters.dropdownField.filterSelection(menuItem))
    await selectedMenuItem.click()
    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/manage")
    await pageP2P.getByText("Users").click()
    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/users")
    await pageP2P.locator(genericFilters.capTableFilters.searchEntryField).first().fill(userFirstName, { delay: 500 })
    await pageP2P.locator(genericFilters.capTableFilters.searchEntryField).first().press("Enter")
    await basePage.waitForFirstRowToLoad()
    await pageP2P.locator(genericFilters.capTableFilters.searchEntryField).nth(1).fill(userLastName, { delay: 500 })
    await basePage.waitForFirstRowToLoad()
    dataTableRowText = await basePage.getTableFirstRowText("firstName")
    await expect(dataTableRowText).toContain(userFirstName)
    await pageP2P.locator(".fa-pencil-alt").click()
    await expect(pageP2P.locator("h1.headline__title")).toBeVisible()
    await expect(pageP2P.locator("#formly_5_input_first_name_0 input")).toBeVisible()
    await pageP2P.locator("cap-button[icon='fas fa-pencil-alt']").click()
    await expect(pageP2P.locator("#formly_5_input_first_name_0 input")).toBeEditable()
    await pageP2P.locator("#formly_5_input_first_name_0 input").fill(userFirstName, { delay: 500 })

    const emailSlider = await pageP2P.locator("#formly_13_inputSwitch_receive_inbox_emails_0 .p-inputswitch")

    await emailSlider.click()
    await expect(emailSlider).not.toHaveClass(/p-inputswitch-checked/)
    await emailSlider.click()
    await expect(emailSlider).toHaveClass(/p-inputswitch-checked/)
    await pageP2P.locator("button[type='submit']").click()
    await expect(pageP2P.locator("p-toastitem.p-element")).toBeVisible()
    await pageP2P.locator("button[aria-label='Close']").click()
    await pageP2P.getByText("Back to overview").click()
    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/users")
    await basePage.waitForFirstRowToLoad()
})

myTest("User navigates to the settings page and adjusts a permission for a role ", async ({ pageP2P }) => {
    const basePage = new BasePage(pageP2P)
    menuItem = "Settings"
    let userRole = "Workflow Editor"
    let searchPermission = "company.csr"

    await pageP2P.locator(".menu-item .menu-icon .fa-ellipsis-v").click()
    const selectedMenuItem = await pageP2P.locator(genericFilters.dropdownField.filterSelection(menuItem))
    await selectedMenuItem.click()
    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/manage")
    await pageP2P.getByText("Roles").click()
    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/roles")
    await pageP2P.locator(genericFilters.capTableFilters.searchEntryField).fill(userRole, { delay: 500 })
    await pageP2P.locator(genericFilters.capTableFilters.searchEntryField).first().press("Enter")
    await basePage.waitForFirstRowToLoad()
    dataTableRowText = await basePage.getTableFirstRowText("name")
    await expect(dataTableRowText).toContain(userRole)
    await pageP2P.locator(".fa-pencil-alt").click()
    await expect(pageP2P.locator("h1.headline__title")).toBeVisible()
    await expect(pageP2P.locator("h1.headline__title")).toContainText("Role")
    const h1Headlinelocator = pageP2P.locator("h1.headline__title")
    const textContent = await h1Headlinelocator.textContent()
    console.log("Dit is de Textcontent log:", textContent)
    await pageP2P.locator("#formly_4_input_name_0").waitFor()
    await expect(pageP2P.locator("#formly_4_input_name_0")).toBeVisible()
    await pageP2P.locator("#formly_4_multiSelect_permissions_2 .form-element").waitFor()
    await expect(pageP2P.locator("#formly_4_multiSelect_permissions_2 .form-element")).toBeVisible()
    await pageP2P.locator("#formly_4_multiSelect_permissions_2 .form-element").click()
    await pageP2P.waitForTimeout(1000)
    await pageP2P.locator(genericFilters.dropdownField.DropdownSearchEntryField).fill(searchPermission, { delay: 1000 })
    await pageP2P.locator(genericFilters.dropdownField.filterSelection(searchPermission)).waitFor()
    await expect(pageP2P.locator(genericFilters.dropdownField.filterSelection(searchPermission))).not.toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    await pageP2P.locator(genericFilters.dropdownField.filterSelection(searchPermission)).click()
    await expect(pageP2P.locator(genericFilters.dropdownField.filterSelection(searchPermission))).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    await pageP2P.locator(genericFilters.dropdownField.filterSelection(searchPermission)).click()
    await pageP2P.locator(".cap-multi-select-panel button").click()
    await pageP2P.locator("button[type='submit']").click()
    await expect(pageP2P.locator("p-toastitem.p-element")).toBeVisible()
    const closeButtonToaster = await pageP2P.locator("button[aria-label='Close']")

    await expect(closeButtonToaster).toBeVisible()
    // await closeButtonToaster.waitFor()
    await closeButtonToaster.click()
    await pageP2P.getByText("Back to overview").click()
})
