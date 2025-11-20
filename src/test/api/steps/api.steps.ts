import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../../hooks/pageFixture";

// GET request
When("I send a GET request to {string}", async function (url: string) {
  fixture.response = await fixture.apiContext.get(url);
  console.log(`Status: ${fixture.response.status()}`);
  fixture.logger.info(`Status: ${fixture.response.status()}`);
  const body = await fixture.response.json();
  console.log("Response Body:", body);
  fixture.logger.info("Response Body: " + body);
});

// POST request
When(
  "I send a POST request to {string} with body:",
  async function (url: string, body: string) {
    fixture.response = await fixture.apiContext.post(url, {
      data: JSON.parse(body),
      headers: { "Content-Type": "application/json" },
    });

    console.log(`Status: ${fixture.response.status()}`);
    fixture.logger.info(`Status: ${fixture.response.status()}`);
    const responseBody = await fixture.response.json();
    console.log("Response Body:", responseBody);
    fixture.logger.info("Response Body:", responseBody);
  }
);

// PUT request
When(
  "I send a PUT request to {string} with body:",
  async function (url: string, body: string) {
    fixture.response = await fixture.apiContext.put(url, {
      data: JSON.parse(body),
      headers: { "Content-Type": "application/json" },
    });
    console.log(`Status: ${fixture.response.status()}`);
    fixture.logger.info(`Status: ${fixture.response.status()}`);
    const responseBody = await fixture.response.json();
    console.log("Response Body:", responseBody);
    fixture.logger.info("Response Body:", responseBody);
  }
);

// DELETE request
When("I send a DELETE request to {string}", async function (url: string) {
  fixture.response = await fixture.apiContext.delete(url);
  console.log(`Status: ${fixture.response.status()}`);
  fixture.logger.info(`Status: ${fixture.response.status()}`);
  const responseBody = await fixture.response.json();
  console.log("Response Body:", responseBody);
  fixture.logger.info("Response Body:", responseBody);
});

// Common assertions
Then(
  "the response status should be {int}",
  async function (statusCode: number) {
    expect(fixture.response.status()).toBe(statusCode);
  }
);

Then("the response should contain {string}", async function (key: string) {
  const body = await fixture.response.json();
  expect(body).toHaveProperty(key);
});
