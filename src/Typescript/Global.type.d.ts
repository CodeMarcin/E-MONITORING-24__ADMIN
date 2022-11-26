export {};

declare global {
  // BUTTON
  type TButtonType = "BASIC" | "SECOND";
  type TButtonWidth = "FLEX" | "FULL";
  // INPUT
  type TInputType = "text" | "number" | "password" | "textarea";
  type TValidataList = "IS_EMPTY" | "NIP_VALIDATE" | "ZIP_CODE_VALIDATE" | "IS_NIP_EXIST";
  // POPUM MODAL
  type TPopupModalIcon = "OK" | "ERROR" | "CONFIRM";
  // LOADER TYPE
  type TLoaderType = "CHECKING_DATA" | "LOADING_DATA" | "SAVING";
}
