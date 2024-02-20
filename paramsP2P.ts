export const navigationBarSelectors = {
    inbox: "a[href='#/admin/invoices/inbox']",
}

export const genericFilters = {
    capTableFilters: {
        capTable: ".cap-table-filters",
        trashCanButton: "i.fa-trash-alt",
        searchEntryField: ".cap-table-filters input.cap-input",
    },
    dropdownField: {
        filterSelection: (selection: string) => `li[aria-label='${selection}']`,
        multiselectItemChecked: "p-ripple p-element p-multiselect-item p-highlight",
        applyFilter: "div.p-multiselect-footer button",
        DropdownSearchEntryField: "input[role='textbox']",
    },
}
// export const inbox = {
//     capTableFilters: {
//         capTable: ".cap-table-filters",
//         trashCanButton: "i.fa-trash-alt",
//         searchEntryField: "input[role='textbox']",
//     },
//     dropdownField: {
//         filterSelection: (selection: string) => `li[aria-label='${selection}']`,
//         multiselectItemChecked: "p-ripple p-element p-multiselect-item p-highlight",
//         applyFilter: "div.p-multiselect-footer button",
//     },
// }

export const dataTable = {
    dataRow: ".row-divider", // Verander dit -> dit kan in toekomst ergens anders [data-test='table_cell_company.name'] .td-value
}

export const invoiceWorkflow = {
    costSplitting: {
        searchEntryField: ".p-dropdown-filter.p-inputtext.p-component",
        filterSelection: (selection: string) => `li[aria-label='${selection}']`,
    },
}
