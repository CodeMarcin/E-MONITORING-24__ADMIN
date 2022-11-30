export {};
declare global {
  interface IContractorAPI {
    _id?: string;
    name: string;
    address: string;
    zipcode: string;
    city: string;
    email: string;
    nip: string;
  }

  interface ISettingsAPI {
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

  interface ISettingsResponseAPI {
    data: ISettingsAPI;
  }
}
