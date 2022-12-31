import { http } from "./Http-common";

export const getCompanyAPI = () => {
  return http.get<ICompanyResponseAPI>("/company/getCompany");
};

export const getInvoiceSettingsAPI = () => {
  return http.get<IInvoiceSettingsResponseAPI>("/company/getInvoiceSettings");
};

export const getPaymentSettingsAPI = () => {
  return http.get<IPaymentResponseAPI>("/company/getPaymentSettings");
};
