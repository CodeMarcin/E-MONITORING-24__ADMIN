/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useCallback } from "react";

import { Header } from "../../Components/Header/Header";
import { Portal } from "../../Components/Portal/Portal";
import { Loader } from "../../Components/Loader/Loader";
import { Input } from "../../Components/Input/Input";

import { getSettingsAPI } from "../../Api/Settings";

import { useStyles } from "../../Hooks/useStyles";
import { useFormatNIP } from "../../Hooks/useFormatNIP";
import { useFormatZipCode } from "../../Hooks/useFormatZipCode";

import { SETTINGS_LABELS } from "./Settings.labels";

import { HEADER_PROPS, SETTINGS_COMPANY_INPUTS_PROPS, SETTINGS_SITE_INPUTS_PROPS } from "./Object";

import styles from "./Settings.module.css";

export const Settings = () => {
  const [inputsState, setinputsState] = useState<IInputProps[]>([]);
  const [apiDataLoad, setApiDataLoad] = useState(false);
  const [loaderText, setLoaderText] = useState<TLoaderType>("LOADING_DATA");

  const changeValue = (e: React.FormEvent<HTMLInputElement>) => {
    let newValue: string;
    const targetValue = (e.target as HTMLInputElement).value;
    const targetName = (e.target as HTMLInputElement).name;
    const itemIndexToChange = inputsState.findIndex((el) => el.name === targetName);
    if (targetName === "nip" && inputsState[itemIndexToChange].value) {
      newValue = useFormatNIP(targetValue, inputsState[itemIndexToChange].value.length);
    }
    if (targetName === "zipcode" && inputsState[itemIndexToChange].value) {
      newValue = useFormatZipCode(targetValue, inputsState[itemIndexToChange].value.length);
    }
    setinputsState((prevState) =>
      prevState.map((el) => {
        if (el.name === targetName) return { ...el, value: newValue ?? targetValue };
        return el;
      })
    );
  };

  const inputCallbacks = {
    onChangeCallback: changeValue,
  };

  const getSettingsData = useCallback(async () => {
    setLoaderText("LOADING_DATA");
    setApiDataLoad(true);
    const settingsDataFromAPI = await getSettingsAPI();

    const settingsCompanyInputs = SETTINGS_COMPANY_INPUTS_PROPS.map((el) => {
      return { ...el, value: settingsDataFromAPI.data.company[el.name] };
    });

    setinputsState(settingsCompanyInputs);
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
        <div className={useStyles("container--main", styles["container"])}>
          <p className={styles["container__title"]}>{SETTINGS_LABELS.TITLE_COMPANY}</p>
          {inputsState.map((el) => (
            <Input items={el} key={el.label} callbacks={inputCallbacks} />
          ))}
          <p className={styles["container__title"]}>{SETTINGS_LABELS.TITLE_SITE}</p>
        </div>
      </div>
    </>
  );
};
