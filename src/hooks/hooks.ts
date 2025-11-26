import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
const fs = require("fs-extra");
import { request, APIRequestContext } from "@playwright/test";
import { initSupabase } from "../helper/db/supaBaseClient";

let browser: Browser;
let context: BrowserContext;
let apiContext: APIRequestContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
  fixture.supabase = initSupabase();
});
// It will trigger for not auth scenarios
Before({ tags: "not @auth" }, async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    recordVideo: {
      dir: "test-results/videos",
    },
  });
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });
  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
});

// It will trigger for auth scenarios
Before({ tags: "@auth" }, async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    storageState: getStorageState(pickle.name),
    recordVideo: {
      dir: "test-results/videos",
    },
  });
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });
  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
});

Before({ tags: "@api" }, async function ({pickle}) {
  const scenarioName = pickle.name + pickle.id;
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });
  fixture.apiContext = await request.newContext();
  fixture.logger = createLogger(options(scenarioName));
});

Before({ tags: "@db" }, async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  fixture.logger = createLogger(options(scenarioName));

  // Optional: Start a transaction or prepare test data
  // Example: fixture.supabase.from('your_table').insert({ ... });
  console.log(`DB setup for scenario: ${scenarioName}`);
});

After({ tags: "@api" }, async function () {
  if (fixture.apiContext) {
    await fixture.apiContext.dispose();
  }
});

After({ tags: "@db" }, async function () {
  // Optional: Rollback transaction or cleanup data
  // Example: await fixture.supabase.from('your_table').delete().eq('test_flag', true);
  console.log("DB cleanup completed");
});


After(async function ({ pickle, result }) {
  let videoPath: string;
  let img: Buffer;
  const path = `./test-results/trace/${pickle.id}.zip`;
  if (result?.status == Status.PASSED) {
    img = await fixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    videoPath = await fixture.page.video().path();
  }
  await context.tracing.stop({ path: path });
  await fixture.page.close();
  await context.close();
  if (result?.status == Status.PASSED) {
    await this.attach(img, "image/png");
    await this.attach(fs.readFileSync(videoPath), "video/webm");
    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`;
    await this.attach(`Trace file: ${traceFileLink}`, "text/html");
  }
});

AfterAll(async function () {
  await browser.close();
  await fixture.db?.end();
});

function getStorageState(
  user: string
):
  | string
  | {
      cookies: {
        name: string;
        value: string;
        domain: string;
        path: string;
        expires: number;
        httpOnly: boolean;
        secure: boolean;
        sameSite: "Strict" | "Lax" | "None";
      }[];
      origins: {
        origin: string;
        localStorage: { name: string; value: string }[];
      }[];
    } {
  if (user.endsWith("admin")) return "src/helper/auth/admin.json";
  else if (user.endsWith("lead")) return "src/helper/auth/lead.json";
}
