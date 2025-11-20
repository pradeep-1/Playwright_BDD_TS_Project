import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000 * 2);

import { expect } from "@playwright/test";
import { fixture } from "../../../hooks/pageFixture";

Given("user search for a {string}", async function (book) {
  fixture.logger.info("Searching for a book: " + book);
  await fixture.page.locator("#inputbar").click();
  await fixture.page.locator("#inputbar").type(book);
  await fixture.page.waitForTimeout(2000);
  await fixture.page
    .locator("(//div[@id='inputbarautocomplete-list']/div)[1]")
    .click();
    await fixture.page.waitForTimeout(2000);
});

When("user add the book to the cart", async function () {
  await fixture.page.locator("(//input[@value='Add to cart'])[1]").click();
  await fixture.page.waitForTimeout(2000);
  const labelMessage = fixture.page.locator("(//label[contains(@id,'lblcartmsg')])[1]");
  await expect(labelMessage).toHaveText('Product successsfully added to the cart');
  const labelMessageText = await labelMessage.textContent();
  console.log("labelMessageText: " + labelMessageText);
  fixture.logger.info("labelMessageText: " + labelMessageText);
});

Then("the cart badge should get updated", async function () {
  const badgeCount = await fixture.page
    .locator("#ctl00_lblTotalCartItems")
    .textContent();
  expect(Number(badgeCount)).toBeGreaterThan(0);
});
