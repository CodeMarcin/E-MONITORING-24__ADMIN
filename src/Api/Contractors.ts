import { http } from "./Http-common";

export const getAllContractorsAPI = (sortBy: string, sortType: string, limit: number) => {
  return http.get(`contractors/getAllContractors/${sortBy}/${sortType}/${limit}`);
};

export const findContractorByNIPAPI = (nip: string, limit: number) => {
  return http.get(`contractors/getContracorByNIP/${nip}/${limit}`);
};

export const addContractorAPI = (contractor: IContractorAPI) => {
  console.log(contractor, "con");
  return http.post("/contractors/addContractor", contractor);
};
