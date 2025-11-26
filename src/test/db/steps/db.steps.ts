import { Given, When, Then, JsonFormatter } from "@cucumber/cucumber";
import { fixture } from "../../../hooks/pageFixture";
import { expect } from "@playwright/test";

//  Supabase Steps
Given("I have a Supabase client", async function () {
  expect(fixture.supabase).toBeDefined();
});

When(
  "I insert a user into Supabase with name {string} and email {string} and validate the user with email",
  async function (name: string, email: string) {
    const uniqueEmail = `john_${Date.now()}@example.com`;
    const { error } = await fixture.supabase
      .from("users")
      .insert([{ name, email: uniqueEmail }], { returning: "representation" });
    expect(error).toBeNull();

    const { data: rows, error: selectError } = await fixture.supabase
      .from("users")
      .select("*")
      .eq("email", uniqueEmail);
    fixture.logger.info("Rows" + JSON.stringify(rows));
    expect(selectError).toBeNull();
    expect(rows).toHaveLength(1);
    expect(rows[0].name).toBe(name);
    fixture.logger.info(`Actual Name: ${JSON.stringify(rows[0].name)} Expected Name: ${JSON.stringify(name)}`);
    console.log(`Actual Name: ${JSON.stringify(rows[0].name)} Expected Name: ${JSON.stringify(name)}`)
    expect(rows[0].email).toBe(uniqueEmail);
    fixture.logger.info(`Actual Email: ${JSON.stringify(rows[0].email)} Expected Email: ${JSON.stringify(rows[0].email)}`);
    console.log(`Actual Email: ${JSON.stringify(rows[0].email)} Expected Email: ${JSON.stringify(rows[0].email)}`)
  }
);
