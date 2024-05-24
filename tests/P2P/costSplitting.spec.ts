import { test, expect, request } from "@playwright/test"
import BasePage from "../../pageobjects/P2P/_basePage"
import { myTest } from "./Fixtures/baseFixtures"
import { dataTable, genericFilters, invoiceWorkflow, navigationBarSelectors } from "../../paramsP2P"
import exp from "constants"

let companyName, selectedCompany

myTest("Cost split an invoice", async ({ pageP2P }) => {
    const basePage = new BasePage(pageP2P)
    let invoiceStatus, selectedInvoiceStatus, ledgerAccount, selectedLedgerAccount

    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/dashboard")
    await pageP2P.locator(navigationBarSelectors.inbox).click()
    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/invoices/inbox")
    await pageP2P.locator(genericFilters.capTableFilters.capTable).waitFor("visible")
    await basePage.waitForFirstRowToLoad()
    await pageP2P.locator(genericFilters.capTableFilters.capTable).getByText("company").click()
    companyName = "SMARTQA-TEST"
    selectedCompany = await pageP2P.locator(genericFilters.dropdownField.filterSelection(companyName))
    await selectedCompany.click()
    await expect(selectedCompany).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    await pageP2P.locator(genericFilters.dropdownField.applyFilter).click()
    await basePage.waitForFirstRowToLoad()
    await pageP2P.locator(genericFilters.capTableFilters.capTable).getByText("status").click()
    invoiceStatus = "New"
    await pageP2P.locator(genericFilters.dropdownField.DropdownSearchEntryField).fill(invoiceStatus, { delay: 500 })
    selectedInvoiceStatus = await pageP2P.locator(genericFilters.dropdownField.filterSelection(invoiceStatus))
    selectedInvoiceStatus.click()
    await expect(selectedInvoiceStatus).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    await pageP2P.locator(genericFilters.dropdownField.applyFilter).click()
    await basePage.waitForFirstRowToLoad()
    await pageP2P.locator(dataTable.dataRow).nth(0).click()

    await expect(pageP2P.locator(".p-progress-spinner-svg")).toBeVisible()
    await expect(pageP2P.locator(".p-progress-spinner-svg")).not.toBeVisible()

    // async function waitForElementToDisappear(page, selector) {
    //     while (await page.locator(selector).isVisible()) {
    //         await page.waitForTimeout(1000)
    //     }
    // }

    // await waitForElementToDisappear(pageP2P, ".p-progress-spinner-svg")

    const statusBlock = await pageP2P.locator("span.status")
    await statusBlock.waitFor()

    const costSplitSlider = await pageP2P.locator("p-inputswitch .p-inputswitch-slider")
    await costSplitSlider.waitFor()

    const invoice = await pageP2P.locator("#viewerContainer .pdfViewer")
    await invoice.waitFor()

    await pageP2P.locator("#ledger-account .form-element").click()
    ledgerAccount = "21040 - TE VORDEREN BTW DIV%"
    await pageP2P.locator(invoiceWorkflow.costSplitting.searchEntryField).fill(ledgerAccount, { delay: 500 })
    selectedLedgerAccount = await pageP2P.locator(invoiceWorkflow.costSplitting.filterSelection(ledgerAccount))
    await selectedLedgerAccount.waitFor()
    await selectedLedgerAccount.click()
    await costSplitSlider.waitFor()
    await invoice.waitFor()

    const amountText = await pageP2P.locator(".cost-splitting .remaining-amount").textContent()
    const splitAmountText = amountText.split(" ")[8]
    const formattedAmount = splitAmountText.replace(/\./g, "")

    console.log("Dit is het bedrag wat ingevuld moet worden zonder format, de textContent ophalen", formattedAmount)

    await pageP2P.locator("input.cost-splitting-input").fill(formattedAmount, { delay: 500 })
    await pageP2P.locator("div.invoice-head #description input").fill("testAutomation", { delay: 500 })
    await costSplitSlider.waitFor()
    await invoice.waitFor()

    console.log("Dit is het bedrag wat ingevuld moet worden en is al geformat in de code", formattedAmount)

    await pageP2P.getByText("Select workflow").click()
    await pageP2P.locator(".col.content-left.pr-5 .p-dropdown-trigger").click()
    let workflow = "SmartQA (v2) (Approval)"
    await pageP2P.locator(".p-dropdown-header input[type='text']").fill(workflow, { delay: 1000 })
    let selectedWorkflow = await pageP2P.locator(invoiceWorkflow.costSplitting.filterSelection(workflow))
    await selectedWorkflow.waitFor()
    await selectedWorkflow.click()
    await costSplitSlider.waitFor()
    await invoice.waitFor()

    await pageP2P.locator(".invoice-workflow-steps").waitFor()
    await pageP2P.locator(".buttons.float-right button.success").click()

    const toasterElement = await pageP2P.locator("p-toastitem.p-element")
    await toasterElement.waitFor()
    await expect(toasterElement).toBeVisible()
    await costSplitSlider.waitFor()
    await invoice.waitFor()
    await pageP2P.locator("button[aria-label='Close']").click()

    await expect(toasterElement).not.toBeVisible()

    await pageP2P.getByText("Continue workflow").click()

    async function waitForStatusCode(page, url, expectedStatusCode) {
        while (true) {
            const response = await page.waitForResponse((response) => response.url() === url)
            if (response.status() === expectedStatusCode) {
                return
            }
        }
    }

    await waitForStatusCode(pageP2P, "https://p2p.acceptatie.pp-group.eu/api/api/module/synchronize", 200)

    await expect(costSplitSlider).not.toBeVisible()
    await expect(invoice).not.toBeVisible()

    // // gaan naar de inbox

    await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/invoices/inbox")
    // verwacht toast element en click het weg
    await toasterElement.waitFor()
    await expect(toasterElement).toBeVisible()
    await pageP2P.locator("button[aria-label='Close']").click()
    const uploadButton = await pageP2P.locator("cap-button[icon='fas fa-file-upload']")
    await uploadButton.waitFor()
    const filters = await pageP2P.locator(genericFilters.capTableFilters.capTable)
    await filters.waitFor()

    // hier nog meer ellende --->

    // // gaan naar de invoiceHistory
    // await pageP2P.locator("a[href='#/admin/invoices/list']").click()
    // await pageP2P.waitForURL("https://p2p.acceptatie.pp-group.eu/#/admin/invoices/list")

    // await expect(pageP2P.locator("h1.headline__title")).toBeVisible()
    // await expect(pageP2P.locator("h1.headline__title")).toContainText("Invoice History")

    // // wacht op de filters
    // await filters.waitFor({ timeout: 5000 })

    // // zoek op company
    // await pageP2P.locator(genericFilters.capTableFilters.capTable).getByText("company").click()
    // companyName = "520-TRAD BC14-TEST"
    // selectedCompany = await pageP2P.locator(genericFilters.dropdownField.filterSelection(companyName))
    // await selectedCompany.click()
    // await expect(selectedCompany).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    // await pageP2P.locator(genericFilters.dropdownField.applyFilter).click()
    // await basePage.waitForFirstRowToLoad()

    // // zoek op supplier
    // await pageP2P.locator(genericFilters.capTableFilters.capTable).getByText("supplier").click()
    // const supplierName = "Jordex Shipping & Forwarding BV-EUR"
    // await pageP2P.locator(genericFilters.dropdownField.DropdownSearchEntryField).fill(supplierName, { delay: 500 })
    // const selectedSupplier = await pageP2P.locator(genericFilters.dropdownField.filterSelection(supplierName))
    // selectedSupplier.click()
    // await expect(selectedSupplier).toHaveClass(genericFilters.dropdownField.multiselectItemChecked)
    // await pageP2P.locator(genericFilters.dropdownField.applyFilter).click()
    // await basePage.waitForFirstRowToLoad()

    // //click op de bovenste invoice en valideer de vervolg page
    // await pageP2P.locator(dataTable.dataRow).nth(0).click()

    // await expect(pageP2P.locator(".p-progress-spinner-svg")).toBeVisible()
    // await expect(pageP2P.locator(".p-progress-spinner-svg")).not.toBeVisible()
    // await statusBlock.waitFor()
    // await expect(statusBlock).toBeVisible()
    // const saveButton = await pageP2P.locator("span.fa-save")
    // await saveButton.waitFor()
    // await expect(saveButton).toBeVisible()
})

// maak invoice test af
// maak meerdere scenarios voor P2P op papier
// volgende week met storybook bezig

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

//1002444
