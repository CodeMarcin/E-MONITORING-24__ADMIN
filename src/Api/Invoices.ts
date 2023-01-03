import { http } from "./Http-common";

export const addInvoiceAPI = (invoice: IInvoiceAddDataToSendAPI) => {
  return http.post("/invoices/addInvoice", invoice);
};
