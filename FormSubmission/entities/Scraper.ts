import { Context } from "@azure/functions";
import { Browser, LaunchOptions, Page, chromium } from "playwright";
import { FingerprintGenerator } from "fingerprint-generator";
import { newInjectedContext } from "fingerprint-injector";
import { IFormSelectorData } from "../types/formSelector.types";
import { ScraperUtils } from "./Scraper.utils";

export default class Scraper {
  context: Context;
  pageUrl: string;

  constructor(pageUrl: string, context: Context) {
    this.pageUrl = pageUrl;
    this.context = context;
  }

  async openPage(page: Page): Promise<void> {
    debugger;
    const pageUrl = this.pageUrl;
    await page.goto(pageUrl, { timeout: 0, waitUntil: "load" });
  }

  async getBrowser(
    slowMo = 300,
    browserChannel: "msedge" | "chrome" = "chrome"
  ): Promise<{
    browser: Browser;
    page: Page;
  }> {
    this.context.log("Using Playwright");
    this.context.log(`slowMo: ${slowMo}`);
    try {
      let options: LaunchOptions = {
        headless: false,
        slowMo: slowMo,
        args: [
          // `--headless=new`,
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-blink-features",
          "--disable-blink-features=AutomationControlled",
        ],
      };
      const browser: Browser = await chromium.launch({
        ...options,
        channel: browserChannel,
      });
      const browserContext = await browser.newContext();
      const page: Page = await browserContext.newPage();

      return { browser, page };
    } catch (error) {
      this.context.log.error("ERROR while getting random browser: " + error);
    }
  }

  async populateForm(
    page: Page,
    formSelectorData: IFormSelectorData
  ): Promise<void> {
    for (const element of formSelectorData.formElementSelectors) {
      if (element.type === "input") {
        await ScraperUtils.typeText(page, element.selector, "test");
      }
    }
  }
  async isPagePopulated(page: Page): Promise<boolean> {
    return false;
  }

  async populateSelectedProperty(page: Page) {
    return null;
  }
  async submitForm(page: Page): Promise<void> {}
}
