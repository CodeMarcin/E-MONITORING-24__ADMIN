import { http } from "./Http-common";

export const findContractorByNIP = (nip: string, limit: number) => {
  return http.get(`contractors/getContracorByNIP/${nip}/${limit}`);
};
