import { Locator, Page } from "@playwright/test"

export default class BasePage {
    constructor(public page: Page) {} // VRAAG ELV/MICH OOK EENS NAAR DIE SUPER, EN WAAROM ER 2 maal hetzelfde gecalled moet wroden althans zo oogt het

    // anders kan accountPage niet de dingen gebruiken op de basePage zonder super ?

    async buttonGetByRole(buttonText): Promise<Locator> {
        return this.page.getByRole("button", { name: buttonText })
    }

    async getByRoleDynamic(role, text): Promise<Locator> {
        return this.page.getByRole(role, { name: text })
    }

    async getButtonByRole(page, buttonText) {
        await page.getByRole("button", { name: buttonText }).click()
    }

    async generateRandomEmail(): Promise<string> {
        const letters = "abcdefghijklmnopqrstuvwxyz"
        const randomInt = Math.floor(Math.random() * 1000)
        const randomLetter1 = letters.charAt(Math.floor(Math.random() * letters.length))
        const randomLetter2 = letters.charAt(Math.floor(Math.random() * letters.length))

        const randomEmail = `user${randomLetter1}${randomLetter2}${randomInt}@example.com`
        return randomEmail
    }
}

/* buttonGetByRole  waarom werkt dit niet // wat is nou beter, dit of onderstaand,
         dit toch want je clicked nog niet je kan er alles mee ?  PROBEER HET EVLIRA UIT TE LEGGEN WAT JE DENKT TE SNAPPEN !!!! en zeg ook dat chatGPT gaar is, hij zegt dat een await
         hier het op had kunnen lossen, maar je hebt een dubbelle await nodig in de test
         
         ASK ook waarom hier dan geen promise<string> kan, krijg je locator gezeik, had dat eerst niet, met any, nu wel is dat handig ?
         */
