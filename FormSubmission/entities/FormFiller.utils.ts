import { delay } from "@azure/core-http";
import path = require("path");
import { Page } from "playwright";

export class FormFillerUtils {
  static async typeText(page: Page, selector: string, value: string) {
    await page.click(selector);
    await page.keyboard.type(value);
  }

  static async selectRadioBtn(page: Page, selector: string, value: string) {
    const radioInputElements = await page.$$(selector);

    for (let element of radioInputElements) {
      const radioBtnValue = await element.evaluate((radio) => {
        return radio["value"];
      });
      await delay(1000);
      if (value === radioBtnValue) {
        element.click();
      }
    }
  }

  static async setDummyFile(page: Page, selector: string, value: string) {
    const filePath = path.resolve(process.cwd(), value);
    await page.setInputFiles(selector, filePath);
  }

  static async selectCheckbox(page: Page, selector: string) {
    await page.click(selector);
  }

  static async isPageRedirected(page: Page, str: string, maxLimitInMs = 15000) {
    let initalMs = 0;

    while (initalMs <= maxLimitInMs) {
      await delay(1000);
      const pageUrl = page.url();
      if (pageUrl.includes(str)) return true;
      initalMs += 1000;
    }

    return false;
  }
}
