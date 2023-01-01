import { INVOICE_ADD_HEADER_LABELS } from "./InvoiceAdd.labels";

export const HEADER_INVOICE_ADD_PROPS: IHeaderProps = {
  title: INVOICE_ADD_HEADER_LABELS.HEADER_TITLE,
  subtitle: INVOICE_ADD_HEADER_LABELS.HEADER_ADD_SUBTITLE,
};

export const DEFAULT_SETTINGS: IInvoiceAddSettings = {
  contractors: [],
  paymentSettings: { accountNumber: "", bankName: "" },
  dataForSelectContractor: { name: "", values: [] },
  dataForSelectPayment: { name: "", values: [] },
  dataForSelectItems: { name: "", values: [] },
  selectedContractor: "",
  selectedPaymentMethod: "transfer",
};

export const DEFAULT_ITEM_DATA: IItem = {
  standard: "piece",
  totalPrice: 1,
  item: [],
};

export const DEFAUL_INVOICE_DATA: IInvoiceAdd = {
  contractor: [],
  company: [],
  invoiceSettings: [],
  paymentSettings: [],
  items: [],
  totalValue: 1,
};
