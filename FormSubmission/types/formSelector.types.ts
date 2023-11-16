export interface IFormElementSelector {
  id: string;
  selector: string;
  type: "input" | "file" | "checkbox" | "radio";
}

export interface IFormSelectorData {
  formElementSelectors: IFormElementSelector[];
  submitSelector: string;
}
