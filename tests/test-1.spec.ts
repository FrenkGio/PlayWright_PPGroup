import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://demo.playwright.dev/todomvc/#/");
  await page.getByPlaceholder("What needs to be done?").click();
  await page
    .getByPlaceholder("What needs to be done?")
    .fill("water the plants");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByPlaceholder("What needs to be done?").fill("make some food");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByPlaceholder("What needs to be done?").fill("go to the gym");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await page.getByPlaceholder("What needs to be done?").click();
  await page
    .getByPlaceholder("What needs to be done?")
    .fill("make a protein shake");
  await page.getByPlaceholder("What needs to be done?").press("Enter");
  await expect(page.getByTestId("todo-title")).toHaveCount(4);
  await page
    .locator("li")
    .filter({ hasText: "water the plants" })
    .getByLabel("Toggle Todo")
    .check();
  await page.getByRole("link", { name: "Active" }).click();
  await expect(page.getByTestId("todo-title")).toHaveCount(3);
  await page.getByRole("link", { name: "Completed" }).click();
});
