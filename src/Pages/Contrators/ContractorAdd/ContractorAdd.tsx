/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Header } from "../../../Components/Header/Header";
import { Input } from "../../../Components/Input/Input";
import { Button } from "../../../Components/Button/Button";
import { Portal } from "../../../Components/Portal/Portal";
import { Loader } from "../../../Components/Loader/Loader";

import { useStyles } from "../../../Hooks/useStyles";
import { useFormatNIP } from "../../../Hooks/useFormatNIP";
import { useFormatZipCode } from "../../../Hooks/useFormatZipCode";
import { useValidateInputs } from "../../../Hooks/useValidateInput";

import { addContractorAPI } from "../../../Api/Contractors";

import { ADD_CONTRATOR_INPUTS_PROPS, HEADER_PROPS } from "./Objects";

import { CONTRATOR_ADD_LABELS } from "./ContractorAdd.labels";

import styles from "./ContractorAdd.module.css";

export const ContractorAdd = () => {
  const [inputsState, setInputsState] = useState(ADD_CONTRATOR_INPUTS_PROPS);
  const [apiDataLoad, setApiDataLoad] = useState(false);
  const [loaderText, setLoaderText] = useState<TLoaderType>("CHECKING_DATA");

  const changeValue = (e: React.FormEvent<HTMLInputElement>) => {
    let newValue: string;
    const targetValue = (e.target as HTMLInputElement).value;
    const targetName = (e.target as HTMLInputElement).name;
    const itemIndexToChange = inputsState.findIndex((el) => el.name === targetName);
    if (targetName === "contractor-nip" && inputsState[itemIndexToChange].value) {
      newValue = useFormatNIP(targetValue, inputsState[itemIndexToChange].value.length);
    }
    if (targetName === "contractor-zipcode" && inputsState[itemIndexToChange].value) {
      newValue = useFormatZipCode(targetValue, inputsState[itemIndexToChange].value.length);
    }
    setInputsState((prevState) =>
      prevState.map((el) => {
        if (el.name === targetName) return { ...el, value: newValue ?? targetValue };
        return el;
      })
    );
  };

  const inputCallbacks = {
    onChangeCallback: changeValue,
  };

  const ADD_BUTTON_PROPS: IButtonProps = {
    type: "BASIC",
    width: "FLEX",
    value: CONTRATOR_ADD_LABELS.BUTTON_VALUE,
    center: true,
    callbacks: {
      onClickCallback: async () => {
        try {
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
            setLoaderText("CHECKING_DATA");
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
        <Header items={HEADER_PROPS} />
        <div className={useStyles("container--main", styles["container"])}>
          {inputsState.map((el) => (
            <Input items={el} key={el.label} callbacks={inputCallbacks} />
          ))}
          <Button items={ADD_BUTTON_PROPS} />
        </div>
      </div>
    </>
  );
};
