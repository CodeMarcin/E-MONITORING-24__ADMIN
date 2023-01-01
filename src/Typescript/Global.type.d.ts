export {};

declare global {
  // BUTTON
  type TButtonType = "BASIC" | "SECOND";
  type TButtonWidth = "FLEX" | "FULL";
  type TButtonOnClickCallback = () => void;
  // INPUT
  type TInputType = "text" | "number" | "password" | "textarea" | "checkbox" | "date";
  type TValidataList = "IS_EMPTY" | "NIP_VALIDATE" | "IS_PRICE" | "ZIP_CODE_VALIDATE" | "EMAIL_VALIDATE" | "IS_NIP_EXIST" | "ACCOUNT_NUMBER_VALIDATE" | "IS_NUMERIC";
  // POPUM MODAL
  type TPopupModalIcon = "OK" | "ERROR" | "CONFIRM";
  // LOADER TYPE
  type TLoaderType = "CHECKING_DATA" | "LOADING_DATA" | "SAVING" | "DELETING";
}
