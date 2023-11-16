import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import config from "../config";
import { formSelectorData } from "./constants/formSelectorData";
import { formElementsData } from "./dummyData/formElementsData";
import FormFiller from "./entities/FormFiller";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("Form Filler Started.");
  try {
    const response = await initFormFiller(context);
    context.res = {
      status: 200,
      body: response,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error,
    };
  }
};

export default httpTrigger;

async function initFormFiller(context: Context) {
  const formFiller = new FormFiller(config.pageUrl, context);
  const { browser, page } = await formFiller.getBrowser();
  await formFiller.openPage(page);
  await formFiller.populateForm(page, formSelectorData, formElementsData);
  const submitResponse = await formFiller.submitForm(
    page,
    formSelectorData.submitSelector
  );
  if (browser) browser.close();
  return submitResponse;
}
