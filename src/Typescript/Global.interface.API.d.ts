export {};
declare global {
  interface IContractorAPI {
    id?: string;
    name: string;
    address: string;
    zipcode: string;
    city: string;
    email: string;
    nip: string;
  }
}
