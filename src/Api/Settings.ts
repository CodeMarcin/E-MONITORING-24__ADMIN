import { http } from "./Http-common";

export const getSettingsAPI = () => {
  return http.get(`settings/getSettings`);
};

export const editSettingsAPI = (settings: ISettingsAPI) => {
  return http.put("settings/editSettings", settings);
};
