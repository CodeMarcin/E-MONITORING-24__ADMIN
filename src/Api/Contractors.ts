import { http } from "./Http-common";

export const findContractorByNIPAPI = (nip: string, limit: number) => {
  return http.get(`contractors/getContracorByNIP/${nip}/${limit}`);
};

export const addContractorAPI = (contractor:  IContractorAPI) => {
  console.log(contractor, "con")
  return http.post("/contractors/addContractor", contractor);
};
