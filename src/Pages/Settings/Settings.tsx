import { useState, useEffect, useCallback } from "react";

import { Header } from "../../Components/Header/Header";
import { Portal } from "../../Components/Portal/Portal";
import { Loader } from "../../Components/Loader/Loader";

import { getSettingsAPI } from "../../Api/Settings";

import { useStyles } from "../../Hooks/useStyles";

import { HEADER_PROPS, SETTINGS_COMPANY_INPUTS_PROPS, SETTINGS_SITE_INPUTS_PROPS } from "./Object";

import styles from "./Settings.module.css";

export const Settings = () => {
  const [apiDataLoad, setApiDataLoad] = useState(false);
  const [loaderText, setLoaderText] = useState<TLoaderType>("LOADING_DATA");

  const getSettingsData = useCallback(async () => {
    setLoaderText("LOADING_DATA");
    setApiDataLoad(true);
    const settingsDataFromAPI = await getSettingsAPI();

    const settingsCompanyInputs = SETTINGS_COMPANY_INPUTS_PROPS.map((el) => {
      return { ...el, value: settingsDataFromAPI.data.company[el.name] };
    });

    const settingsSiteInputs = SETTINGS_SITE_INPUTS_PROPS.map((el) => {
      return { ...el, value: settingsDataFromAPI.data.site[el.name] };
    });

    console.log(settingsCompanyInputs);
    console.log(settingsSiteInputs);
    setApiDataLoad(false);
  }, []);

  useEffect(() => {
    getSettingsData();
  }, [getSettingsData]);

  return (
    <>
      {apiDataLoad && (
        <Portal>
          <Loader type={loaderText} />
        </Portal>
      )}
      <div className={useStyles("container--full-width", styles["settings"])}>
        <Header items={HEADER_PROPS} />
        <div className={useStyles("container--main", styles["container"])}></div>
      </div>
    </>
  );
};
