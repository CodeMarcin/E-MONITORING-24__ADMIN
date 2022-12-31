/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Header } from "../../../Components/Header/Header";
import { Input } from "../../../Components/Input/Input";
import { Button } from "../../../Components/Button/Button";
import { Portal } from "../../../Components/Portal/Portal";
import { Loader } from "../../../Components/Loader/Loader";

import { useStyles } from "../../../Hooks/useStyles";
import { useFormatNIP } from "../../../Hooks/useFormatNIP";
import { useFormatZipCode } from "../../../Hooks/useFormatZipCode";
import { useValidateInputs } from "../../../Hooks/useValidateInput";

import { addContractorAPI, findContractorsByIDAPI, editContractorByIDAPI } from "../../../Api/Contractors";

import { ADD_EDIT_CONTRATOR_INPUTS_PROPS, HEADER_ADD_PROPS, HEADER_EDIT_PROPS } from "./Objects";

import { CONTRATOR_ADD_EDIT_LABELS } from "./ContractorAddEdit.labels";

import styles from "./ContractorAddEdit.module.css";

export const ContractorAddEdit = () => {
  const [inputsState, setInputsState] = useState<IInputProps[]>([]);
  const [apiDataLoad, setApiDataLoad] = useState(false);
  const [loaderText, setLoaderText] = useState<TLoaderType>("CHECKING_DATA");
  const { id: idFromURL } = useParams();

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
    setInputsState((prevState) =>
      prevState.map((el) => {
        if (el.name === targetName) return { ...el, value: newValue ?? targetValue };
        return el;
      })
    );
  };

  const setContractorFromAPI = useCallback(async () => {
    try {
      setLoaderText("LOADING_DATA");
      setApiDataLoad(true);
      let inputs: IInputProps[] = [];
      if (idFromURL) {
        const contractorFromApi = await findContractorsByIDAPI(idFromURL);
        if (contractorFromApi) {
          inputs = ADD_EDIT_CONTRATOR_INPUTS_PROPS.map((el) => {
            return { ...el, originalValue: contractorFromApi.data[el.name], value: contractorFromApi.data[el.name], errorList: [] };
          });
        }
      } else {
        inputs = ADD_EDIT_CONTRATOR_INPUTS_PROPS.map((el) => {
          return { ...el, errorList: [] };
        });
      }
      setInputsState(inputs);
      setApiDataLoad(false);
    } catch (error) {
      console.error(error);
    }
  }, [idFromURL]);

  useEffect(() => {
    setContractorFromAPI();
  }, [setContractorFromAPI]);

  const ADD_BUTTON_PROPS: IButtonProps = {
    type: "BASIC",
    width: "FLEX",
    value: CONTRATOR_ADD_EDIT_LABELS.BUTTON_ADD_VALUE,
    center: true,
    callbacks: {
      onClickCallback: async () => {
        try {
          setLoaderText("CHECKING_DATA");
          setApiDataLoad(true);
          const inputsAfterCheckValue = await Promise.all(
            inputsState.map(async (el) => {
              if (el.validateList) await useValidateInputs(el);
              return el;
            })
          );
          setInputsState(inputsAfterCheckValue);
          if (inputsState.filter((el) => el.errorList).every((el) => el.errorList?.length === 0)) {
            setLoaderText("SAVING");
            await addContractorAPI({
              name: inputsState[0].value,
              address: inputsState[1].value,
              zipcode: inputsState[2].value,
              city: inputsState[3].value,
              email: inputsState[4].value,
              nip: inputsState[5].value,
            });
          }
          setApiDataLoad(false);
        } catch (error) {
          console.error(error);
        }
      },
    },
  };

  const EDIT_BUTTON_PROPS: IButtonProps = {
    type: "BASIC",
    width: "FLEX",
    value: CONTRATOR_ADD_EDIT_LABELS.BUTTON_EDIT_VALUE,
    center: true,
    callbacks: {
      onClickCallback: async () => {
        try {
          setLoaderText("CHECKING_DATA");
          setApiDataLoad(true);
          const inputsAfterCheckValue = await Promise.all(
            inputsState.map(async (el) => {
              if (el.validateList) await useValidateInputs(el);
              return el;
            })
          );
          setInputsState(inputsAfterCheckValue);
          if (inputsState.filter((el) => el.errorList).every((el) => el.errorList?.length === 0)) {
            setLoaderText("SAVING");
            await editContractorByIDAPI({
              _id: idFromURL,
              name: inputsState[0].value,
              address: inputsState[1].value,
              zipcode: inputsState[2].value,
              city: inputsState[3].value,
              email: inputsState[4].value,
              nip: inputsState[5].value,
            });
            await setContractorFromAPI();
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
      <div className={useStyles("container--full-width", styles["contractor-add"])}>
        <Header items={!idFromURL ? HEADER_ADD_PROPS : HEADER_EDIT_PROPS} />
        <div className={useStyles("container--main", styles["container"])}>
          {inputsState.map((el) => (
            <Input items={el} key={el.label} callbacks={{ onChangeCallback: changeValue }} />
          ))}
          <Button items={!idFromURL ? ADD_BUTTON_PROPS : EDIT_BUTTON_PROPS} />
        </div>
      </div>
    </>
  );
};
