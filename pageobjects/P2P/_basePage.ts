import { Locator, Page, expect } from "@playwright/test"
import { dataTable } from "../../paramsP2P"

export default class BasePage {
    constructor(public page: Page) {}

    async getTableFirstRowText(attribute: string): Promise<string> {
        const validAttributeValues = {
            company: "company.name",
            supplier: "supplier.name",
            statusContracts: "translatedStatus",
            statusInboxAndHistory: "translated_status",
            invoiceNo: "supplier_reference",
            name: "name",
            firstName: "first_name",
            // Add more mappings as needed
        }

        const value = validAttributeValues[attribute]
        if (!value) {
            throw new Error(`The attribute you provided is an invalid attribute: ${attribute}`)
        }
        const textContent = await this.page.locator(`.row-divider [data-test='table_cell_${value}']`).nth(0).textContent()
        return textContent!
    }

    async waitForFirstRowToLoad() {
        const firstRow = await this.page.locator(dataTable.dataRow).nth(0)
        await firstRow.waitFor() // -> slaat nergens op dit, want hij hoort te wachten tot het visible is. Echter zonder de wait hieronder jaagt PW gewoon door
        await expect(firstRow).toBeVisible()
        await this.page.waitForTimeout(2000)
    }
}
