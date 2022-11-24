/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";

import { Header } from "../../../Components/Header/Header";
import { Input } from "../../../Components/Input/Input";
import { Button } from "../../../Components/Button/Button";
import { Portal } from "../../../Components/Portal/Portal";
import { Loader } from "../../../Components/Loader/Loader";

import { useStyles } from "../../../Hooks/useStyles";
import { useFormatNIP } from "../../../Hooks/useFormatNIP";
import { useFormatZipCode } from "../../../Hooks/useFormatZipCode";
import { useValidateInputs } from "../../../Hooks/useValidateInput";

import { ADD_CONTRATOR_INPUTS, HEADER_PROPS } from "./Objects";

import { CONTRATOR_ADD_LABELS } from "./ContractorAdd.labels";

import styles from "./ContractorAdd.module.css";

export const ContractorAdd = () => {
  const [inputsState, setInputsState] = useState(ADD_CONTRATOR_INPUTS);
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
    setInputsState((prevState) => {
      prevState[itemIndexToChange].value = newValue ?? (e.target as HTMLInputElement).value;
      return [...prevState];
    });
  };

  const callbacks = {
    onChangeCallback: changeValue,
  };

  useEffect(() => {
    console.log("rerebder");
  }, [inputsState]);

  const ADD_BUTTON_PROPS: IButtonProps = {
    type: "BASIC",
    width: "FLEX",
    value: CONTRATOR_ADD_LABELS.BUTTON_VALUE,
    center: true,
    callbacks: {
      onClickCallback: async () => {
        setApiDataLoad(true);
       const test = await useValidateInputs(inputsState, setInputsState);
        console.log(test, "TEST")
        // setInputsState(data);
        console.log(inputsState, "ISTATE");
        setApiDataLoad(false);

        // if (data) setLoaderText("SAVING");
        // else setLoaderText("CHECKING_DATA");
        // console.log(inputsState, "INPUT STATE BEFORE");
        if (inputsState.every((el) => el.errorList?.length === 0)) console.log("jest ok");
        // console.log(inputsState, "INPUT STATE AFTER");
        // console.log(data, "DATA !!");
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
            <Input items={el} key={el.label} callbacks={callbacks} />
          ))}
          <Button items={ADD_BUTTON_PROPS} />
        </div>
      </div>
    </>
  );
};
