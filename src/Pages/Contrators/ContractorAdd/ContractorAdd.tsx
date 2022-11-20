/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

import { Header } from "../../../Components/Header/Header";
import { Input } from "../../../Components/Input/Input";
import { Button } from "../../../Components/Button/Button";

import { ADD_CONTRATOR_INPUTS, HEADER_PROPS } from "./Objects";

import { CONTRATOR_ADD_LABELS } from "./ContractorAdd.labels";

import { useStyles } from "../../../Hooks/useStyles";
import { useValidateInputy } from "../../../Hooks/useValidateInput";

import styles from "./ContractorAdd.module.css";

export const ContractorAdd = () => {
  const [inputsState, setInputsState] = useState(ADD_CONTRATOR_INPUTS);

  const changeValue = (e: React.FormEvent<HTMLInputElement>) => {
    const itemIndexToChange = inputsState.findIndex((el) => el.name === (e.target as HTMLInputElement).name);
    setInputsState((prevState) => {
      prevState[itemIndexToChange].value = (e.target as HTMLInputElement).value;
      return [...prevState];
    });
  };

  const callbacks = {
    onChangeCallback: changeValue,
  };

  const ADD_BUTTON_PROPS: IButtonProps = {
    type: "BASIC",
    width: "FLEX",
    value: CONTRATOR_ADD_LABELS.BUTTON_VALUE,
    center: true,
    callbacks: {
      onClickCallback: () => {
        useValidateInputy(inputsState, setInputsState);
      },
    },
  };
  return (
    <div className={useStyles("container--full-width", styles["contractor-add"])}>
      <Header items={HEADER_PROPS} />
      <div className={useStyles("container--main", styles["container"])}>
        {inputsState.map((el) => (
          <Input items={el} key={el.label} callbacks={callbacks} />
        ))}
        <Button items={ADD_BUTTON_PROPS} />
      </div>
    </div>
  );
};
