/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useCallback, useMemo } from "react";

import { Header } from "../../Components/Header/Header";
import { Portal } from "../../Components/Portal/Portal";
import { Loader } from "../../Components/Loader/Loader";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";
import { PopupModal } from "../../Components/PopupModal/PopupModal";

import { getSettingsAPI, editSettingsAPI } from "../../Api/Settings";

import { useStyles } from "../../Hooks/useStyles";
import { useFormatNIP } from "../../Hooks/useFormatNIP";
import { useFormatZipCode } from "../../Hooks/useFormatZipCode";
import { useValidateInputs } from "../../Hooks/useValidateInput";
import { useFromatAccountNumber } from "../../Hooks/useFormatAccountNumber";

import { SETTINGS_LABELS, SETTINGS_SITE_LABELS } from "./Settings.labels";

import { HEADER_COMPANY_PROPS, HEADER_SITE_PROPS, SETTINGS_COMPANY_INPUTS_PROPS, SETTINGS_SITE_INPUTS_PROPS } from "./Object";

import styles from "./Settings.module.css";

let IDFromApi: string;

export const Settings = () => {
  const [inputsState, setInputsState] = useState<IInputProps[][]>([]);
  const [apiDataLoad, setApiDataLoad] = useState(true);
  const [loaderText, setLoaderText] = useState<TLoaderType>("LOADING_DATA");
  const [confirmModal, setConfirmModal] = useState<IPopupModalProps>();

  const changeValue = (e: React.FormEvent<HTMLInputElement>) => {
    let newValue: string;
    const targetValue = (e.target as HTMLInputElement).value;
    const targetName = (e.target as HTMLInputElement).name;
    const arrayIndexToChange = inputsState.findIndex((el) => el.find((item) => item.name === targetName));

    const itemIndexToChange = inputsState[arrayIndexToChange].findIndex((el) => el.name === targetName);

    if (targetName === "nip" && inputsState[arrayIndexToChange][itemIndexToChange].value) {
      newValue = useFormatNIP(targetValue, inputsState[arrayIndexToChange][itemIndexToChange].value.length);
    }
    if (targetName === "zipcode" && inputsState[arrayIndexToChange][itemIndexToChange].value) {
      newValue = useFormatZipCode(targetValue, inputsState[arrayIndexToChange][itemIndexToChange].value.length);
    }
    if (targetName === "accountNumber" && inputsState[arrayIndexToChange][itemIndexToChange].value) {
      newValue = useFromatAccountNumber(targetValue, inputsState[arrayIndexToChange][itemIndexToChange].value.length);
    }
    setInputsState((prevState) =>
      prevState.map((el, index) => {
        if (index === arrayIndexToChange)
          return el.map((item) => {
            if (item.name === targetName) return { ...item, value: newValue ?? targetValue };
            return { ...item };
          });
        return [...el];
      })
    );
  };

  const setSettingsData = useCallback(async (dataAfterUpdate?: ISettingsResponseAPI) => {
    try {
      setLoaderText("LOADING_DATA");
      setApiDataLoad(true);
      const settingsDataFromAPI = dataAfterUpdate ?? (await getSettingsAPI());

      const settingsCompanyInputs = SETTINGS_COMPANY_INPUTS_PROPS.map((el) => {
        return { ...el, value: settingsDataFromAPI.data.company[el.name], errorList: [] };
      });

      const settingsSiteInputs = SETTINGS_SITE_INPUTS_PROPS.map((el) => {
        return { ...el, value: settingsDataFromAPI.data.site[el.name], errorList: [] };
      });

      IDFromApi = settingsDataFromAPI.data._id;
      setInputsState([settingsCompanyInputs, settingsSiteInputs]);

      setApiDataLoad(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const toggleConfirmModal = () => {
    setConfirmModal((prevState) => {
      if (prevState) return { ...prevState, show: !prevState.show };
    });
  };

  const CONFIRM_MODAL: IPopupModalProps = useMemo(() => {
    return {
      title: SETTINGS_SITE_LABELS.CONFIRM_MODAL_TITLE,
      show: false,
      buttons: [
        { type: "BASIC", width: "FLEX", value: SETTINGS_SITE_LABELS.CONFIRM_MODAL_BUTTON_TEXT, center: true, callbacks: { onClickCallback: toggleConfirmModal } },
      ],
      toggleModalCallback: toggleConfirmModal,
    };
  }, []);

  useEffect(() => {
    setSettingsData();
  }, [setSettingsData]);

  useEffect(() => {
    setConfirmModal(CONFIRM_MODAL);
  }, [CONFIRM_MODAL]);

  const SAVE_BUTTON_PROPS: IButtonProps = {
    type: "BASIC",
    width: "FLEX",
    value: SETTINGS_LABELS.BUTTON_SAVE_VALUE,
    center: true,
    callbacks: {
      onClickCallback: async () => {
        try {
          setLoaderText("CHECKING_DATA");
          setApiDataLoad(true);
          const inputsAfterCheckValue = await Promise.all(
            inputsState.map(async (el) => {
              await Promise.all(
                el.map(async (item) => {
                  if (item.validateList) await useValidateInputs(item);
                  return item;
                })
              );
              return el;
            })
          );
          setInputsState(inputsAfterCheckValue);
          if (
            !inputsState
              .flat()
              .filter((el) => el.errorList)
              .some((el) => !!el.errorList?.length)
          ) {
            setLoaderText("SAVING");
            const settingsDataAfterUpdate = await editSettingsAPI({
              _id: IDFromApi,
              company: {
                name: inputsState[0][0].value,
                address: inputsState[0][1].value,
                zipcode: inputsState[0][2].value,
                city: inputsState[0][3].value,
                email: inputsState[0][4].value,
                nip: inputsState[0][5].value,
                phoneNumber: inputsState[0][6].value,
                siteAddress: inputsState[0][7].value,
                accountNumber: inputsState[0][8].value,
                bankName: inputsState[0][9].value,
              },
              site: {
                accountantEmail: inputsState[1][0].value,
                lastInvoiceNumber: inputsState[1][1].value,
                lastInvoiceYear: inputsState[1][2].value,
                placeOfIssue: inputsState[1][3].value,
              },
            });
            setSettingsData(settingsDataAfterUpdate);
            setApiDataLoad(false);
            toggleConfirmModal();
          }

          setApiDataLoad(false);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };

  return (
    <>
      {apiDataLoad && (
        <Portal>
          <Loader type={loaderText} />
        </Portal>
      )}

      {confirmModal?.show && <PopupModal items={confirmModal} />}

      <div className={useStyles("container--full-width", styles["settings"])}>
        <Header items={HEADER_COMPANY_PROPS} />
        <div className={useStyles("container--main", styles["container"])}>
          {inputsState[0] && inputsState[0].map((el) => <Input items={el} key={el.label} callbacks={{ onChangeCallback: changeValue }} />)}
        </div>
      </div>
      <div className={useStyles("container--full-width", styles["settings"])}>
        <Header items={HEADER_SITE_PROPS} />
        <div className={useStyles("container--main", styles["container"])}>
          {inputsState[1] && inputsState[1].map((el) => <Input items={el} key={el.label} callbacks={{ onChangeCallback: changeValue }} />)}
          <Button items={SAVE_BUTTON_PROPS} />
        </div>
      </div>
    </>
  );
};
