export {};
declare global {
  export interface IContractorAPI {
    _id?: string;
    name: string;
    address: string;
    zipcode: string;
    city: string;
    email: string;
    nip: string;
  }

  export interface ICompanyAPI {
    _id?: string;
    name: string;
    address: string;
    zipcode: string;
    city: string;
    email: string;
    nip: string;
    phoneNumber: string;
    siteAddress: string;
  }

  export interface IInvoiceSettingsAPI {
    _id?: string;
    lastInvoiceNumber: string;
    lastInvoiceYear: string;
    placeOfIssue: string;
  }

  export interface ISettingsAPI {
    _id?: string;
    company: {
      name: string;
      address: string;
      zipcode: string;
      city: string;
      email: string;
      nip: string;
      phoneNumber: string;
      siteAddress: string;
      accountNumber: string;
      bankName: string;
    };
    site: {
      accountantEmail: string;
      lastInvoiceNumber: string;
      lastInvoiceYear: string;
      placeOfIssue: string;
    };
  }

  export interface IPaymentAPI {
    _id?: string;
    accountNumber: string;
    bankName: string;
  }

  export interface ISettingsResponseAPI {
    data: { site: { [key: string]: string } };
  }

  export interface IPaymentResponseAPI {
    company: IPaymentAPI;
  }

  export interface IContractorResponseApi {
    data: IContractorAPI[];
  }

  export interface ICompanyResponseAPI {
    company: ICompanyAPI;
  }

  export interface IInvoiceSettingsResponseAPI {
    site: IInvoiceSettingsAPI;
  }
}
