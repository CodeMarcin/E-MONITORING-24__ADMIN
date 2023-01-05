import { http } from "./Http-common";

export const getAllContractorsAPI = (sortBy: string, sortType: string, limit: number) => {
  return http.get<IContractorAPI[]>(`contractors/getAllContractors/${sortBy}/${sortType}/${limit}`);
};

export const findContractorByNIPAPI = (nip: string, limit: number) => {
  return http.get(`contractors/getContracorByNIP/${nip}/${limit}`);
};

export const findContractorsByIDAPI = (id: string) => {
  return http.get(`contractors/getContracorByID/${id}`);
};

export const addContractorAPI = (contractor: IContractorAPI) => {
  return http.post("/contractors/addContractor", contractor);
};

export const editContractorByIDAPI = (contractor: IContractorAPI) => {
  return http.put("/contractors/editContractorByID", contractor);
};

export const deleteContractorByIDAPI = (id: string, deleteAllInvoices: boolean) => {
  return http.delete(`/contractors/delteContractorByID/${id}/${deleteAllInvoices}`);
};
