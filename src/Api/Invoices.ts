import { http } from "./Http-common";

export const addInvoiceAPI = (invoice: IInvoiceAddDataToSendAPI) => {
  return http.post("/invoices/addInvoice", invoice);
};

export const findInvoiceByInvoiceNumberAndInvoiceYear = (invoiceNumber: string, invoiceYear: string) => {
  return http.get<IInvoiceFindInvoiceByInvoiceNumberAndInvoiceYearAPI>(`/invoices/findInvoiceByInvoiceNumberAndInvoiceYear/${invoiceNumber}/${invoiceYear}`);
};
