import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import Scraper from "./entities/Scraper";
import config from "../config";
import { formSelectorData } from "./constants/formSelectorData";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");
  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  await startFunc(context);
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};

export default httpTrigger;

async function startFunc(context: Context) {
  const scraper = new Scraper(config.pageUrl, context);
  debugger;
  const { browser, page } = await scraper.getBrowser();
  await scraper.openPage(page);
  await scraper.populateForm(page, formSelectorData);
}
