import { Page } from "playwright";

export class ScraperUtils {
  static async typeText(page: Page, selector: string, value: string) {
    await page.click(selector);
    await page.keyboard.type(value);
  }
}
