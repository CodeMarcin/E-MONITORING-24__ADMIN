import { SETTINGS_HEADERS_LABELS, SETTINGS_COMPANY_LABELS, SETTINGS_SITE_LABELS } from "./Settings.labels";

export const SETTINGS_COMPANY_INPUTS_PROPS: IInputProps[] = [
  {
    label: SETTINGS_COMPANY_LABELS.COMPANY_NAME,
    type: "text",
    name: "name",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    label: SETTINGS_COMPANY_LABELS.COMPANY_ADDRESS,
    type: "text",
    name: "address",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    label: SETTINGS_COMPANY_LABELS.COMPANY_ZIPCODE,
    type: "text",
    name: "zipcode",
    value: "",
    showName: true,
    validateList: ["ZIP_CODE_VALIDATE", "IS_EMPTY"],
    errorList: [],
    maxLength: 6,
  },
  {
    label: SETTINGS_COMPANY_LABELS.COMPANY_CITY,
    type: "text",
    name: "city",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    label: SETTINGS_COMPANY_LABELS.COMPANY_EMAIL,
    type: "text",
    name: "email",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY", "EMAIL_VALIDATE"],
    errorList: [],
  },
  {
    label: SETTINGS_COMPANY_LABELS.COMPANY_NIP,
    type: "text",
    name: "nip",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY", "NIP_VALIDATE"],
    errorList: [],
    maxLength: 13,
  },
  {
    label: SETTINGS_COMPANY_LABELS.COMPANY_PHONE,
    type: "text",
    name: "phoneNumber",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    label: SETTINGS_COMPANY_LABELS.COMPANY_SITE,
    type: "text",
    name: "siteAddress",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    label: SETTINGS_COMPANY_LABELS.COMPANY_ACCOUNT_NUMBER,
    type: "text",
    name: "accountNumber",
    value: "",
    showName: true,
    maxLength: 32,
    validateList: ["IS_EMPTY", "ACCOUNT_NUMBER_VALIDATE"],
    errorList: [],
  },
  {
    label: SETTINGS_COMPANY_LABELS.COMPANY_BANK_NAME,
    type: "text",
    name: "bankName",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
];

export const SETTINGS_SITE_INPUTS_PROPS: IInputProps[] = [
  {
    label: SETTINGS_SITE_LABELS.SITE_ACCOUNTANT_EMAIL,
    type: "text",
    name: "accountantEmail",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY", "EMAIL_VALIDATE"],
    errorList: [],
  },
  {
    label: SETTINGS_SITE_LABELS.SITE_LAST_INVOICE_NUMBER,
    type: "text",
    name: "lastInvoiceNumber",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY", "IS_NUMERIC"],
    errorList: [],
  },
  {
    label: SETTINGS_SITE_LABELS.SITE_LAST_INVOICE_YEAR,
    type: "text",
    name: "lastInvoiceYear",
    value: "",
    showName: true,
    maxLength: 4,
    validateList: ["IS_EMPTY", "IS_NUMERIC"],
    errorList: [],
  },
  {
    label: SETTINGS_SITE_LABELS.SITE_PLACE_OF_ISSUE,
    type: "text",
    name: "placeOfIssue",
    value: "",
    showName: true,
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
];

export const HEADER_COMPANY_PROPS: IHeaderProps = {
  title: SETTINGS_HEADERS_LABELS.HEADER_TITLE,
  subtitle: SETTINGS_HEADERS_LABELS.HEADER_COMPANY_SUBTITLE
};

export const HEADER_SITE_PROPS: IHeaderProps = {
  title: SETTINGS_HEADERS_LABELS.HEADER_TITLE,
  subtitle: SETTINGS_HEADERS_LABELS.HEADER_SITE_SUBTITLE,
};
