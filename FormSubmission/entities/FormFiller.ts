import { Context } from "@azure/functions";
import { Browser, LaunchOptions, Page, chromium } from "playwright";
import { IFormSelectorData } from "../types/formSelector.types";
import { FormFillerUtils } from "./FormFiller.utils";

export default class FormFiller {
  context: Context;
  pageUrl: string;

  constructor(pageUrl: string, context: Context) {
    this.pageUrl = pageUrl;
    this.context = context;
  }

  async openPage(page: Page): Promise<void> {
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
        headless: true,
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
    formSelectorData: IFormSelectorData,
    formElementsValue: any
  ): Promise<void> {
    for (const element of formSelectorData.formElementSelectors) {
      switch (element.type) {
        case "checkbox":
          await FormFillerUtils.selectCheckbox(page, element.selector);
          break;

        case "radio":
          await FormFillerUtils.selectRadioBtn(
            page,
            element.selector,
            formElementsValue[element.id]
          );
          break;

        case "input":
          await FormFillerUtils.typeText(
            page,
            element.selector,
            formElementsValue[element.id]
          );
          break;

        case "file":
          await FormFillerUtils.setDummyFile(
            page,
            element.selector,
            formElementsValue[element.id]
          );
          break;

        default:
          break;
      }
    }
  }

  async submitForm(
    page: Page,
    submitBtnSelector: string
  ): Promise<{ url: string; isSubmitted: boolean }> {
    await page.click(submitBtnSelector);

    const isSubmiited = await FormFillerUtils.isPageRedirected(
      page,
      "/submitted/",
      10000
    );
    if (isSubmiited) return { isSubmitted: true, url: page.url() };
    return { isSubmitted: false, url: page.url() };
  }
}
