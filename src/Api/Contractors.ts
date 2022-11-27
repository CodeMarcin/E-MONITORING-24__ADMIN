import { http } from "./Http-common";

export const getAllContractorsAPI = (sortBy: string, sortType: string, limit: number) => {
  return http.get(`contractors/getAllContractors/${sortBy}/${sortType}/${limit}`);
};

export const findContractorByNIPAPI = (nip: string, limit: number) => {
  return http.get(`contractors/getContracorByNIP/${nip}/${limit}`);
};

export const addContractorAPI = (contractor: IContractorAPI) => {
  return http.post("/contractors/addContractor", contractor);
};

export const delteContractorByIDAPI = (id: string) => {
  return http.delete(`/contractors/delteContractorByID/${id}`);
};
