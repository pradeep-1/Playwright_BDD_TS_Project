import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2);

Given(
  "User navigates to the application",
  { timeout: 60000 },
  async function () {
    await fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to the application");
  }
);

Given("User click on the login link", { timeout: 60000 }, async function () {
  await fixture.page.hover("#ctl00_lblUser");
  await fixture.page.locator('//a[normalize-space()="Log in"]').click();
});

Given("User enter the username as {string}", async function (username: string) {
  await fixture.page.fill("#ctl00_phBody_SignIn_txtEmail", username);
});

Given("User enter the password as {string}", async function (password: string) {
  await fixture.page.fill("#ctl00_phBody_SignIn_txtPassword", password);
});

When("User click on the LoginIn button", async function () {
  await fixture.page.locator("#ctl00_phBody_SignIn_btnLogin").click();
});

Then("Login should be success", async function () {
  const title = fixture.page.locator(
    'xpath=(//h1[normalize-space()="My Account"])'
  );
  await expect(title).toHaveText("My Account");
  const titleName = await title.textContent();
  console.log("titleName: " + titleName);
  fixture.logger.info("titleName: " + titleName);
});

Then("Login should fail", async function () {
  const errorBanner = fixture.page.locator("#ctl00_phBody_SignIn_lblmsg");
  await expect(errorBanner).toHaveText("Please enter correct password.");
  const errorText = await errorBanner.textContent();
  console.log("errorText: " + errorText);
  fixture.logger.info("errorText: " + errorText);
});
