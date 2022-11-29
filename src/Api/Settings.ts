import { http } from "./Http-common";

export const getSettingsAPI = () => {
  return http.get(`settings/getSettings`);
};