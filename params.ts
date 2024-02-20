export const homePageSelectors = {
    signInButton: "a[title='Log in to your customer account']",
    searchCatalaogInputField: "input[type='text']",
    clothesButton: "#category-3",
    searchResults: "a.product-thumbnail img",
}

export const accountPageSelectors = {
    emailField: "#login-form input[name='email']",
    passwordField: "input[type='password']",
    signInSubmitButton: "button#submit-login", // zelfde als bij de function, maar dat is de PW manier
    signedInUser: ".account",
    signOutButton: "a.logout",
    createNewAccountLink: "div.no-account",
    createAccount: {
        socialTitleButton: "input[name='id_gender'][value='1']",
        firstNameField: "input[name='firstname']",
        lastNameField: "input[name='lastname']",
        emailField: ".form-group input[name='email']:visible",
        passwordField: "input[name='password']",
        DOBField: "input[name='birthday']",
        signUpForNewsletterButton: "input[name='newsletter']",
        saveButton: "button.btn[type='submit']",
    },
}

export const searchResultSelectors = {
    searchResults: "div[itemprop='itemListElement'] [itemprop='url']",
}

export const PdpSelectors = {
    productTitle: ".h1",
    addToCart: "div.add",
}

export const cartPage = {
    shoppingCartTitle: ".card-block h1",
    addToCart: ".checkout",
}

export const checkoutPage = {
    continuePersonalInfoCTA: "button[name='continue']:visible",
}

export const fruit = {
    printFruit: function () {
        console.log("test")
    },
}

export function buttonGetByRole(page, buttonText) {
    return page.getByRole("button", { name: buttonText }) // PW manier van signInSubmitButton hierboven,
}

// Wellicht dit ook ff asken , waarom werkt bovenstaand wel, en bij basePage de bovenst async niet

// getByLabel("Mr.");
