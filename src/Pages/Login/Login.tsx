/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";

import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";

import { useValidateInputy } from "../../Hooks/useValidateInput";

import { SVGTopLoginIcon } from "../../Utilities/SVG";

import { LOGIN_LABELS } from "./Login.labels";

import styles from "./Login.module.css";

const INPUTS_PROPS: IInputProps[] = [
  {
    type: "text",
    label: LOGIN_LABELS.LOGIN,
    name: "login",
    showName: false,
    value: "",
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
  {
    type: "password",
    label: LOGIN_LABELS.PASSWORD,
    name: "password",
    showName: false,
    value: "",
    validateList: ["IS_EMPTY"],
    errorList: [],
  },
];

export const Login = () => {
  const [inputsState, setInputsState] = useState(INPUTS_PROPS);

  const changeValue = (e: React.FormEvent<HTMLInputElement>) => {
    const itemIndexToChange = inputsState.findIndex((el) => el.name === (e.target as HTMLInputElement).name);
    setInputsState((prevState) => {
      prevState[itemIndexToChange].value = (e.target as HTMLInputElement).value;
      return [...prevState];
    });
  };

  const callbacksInput = {
    onChangeCallback: changeValue,
  };

  const buttonLoginProps: IButtonProps = {
    type: "BASIC",
    width: "FULL",
    value: LOGIN_LABELS.LOGIN_BUTTON,
    callbacks: {
      onClickCallback: () => {
        useValidateInputy(inputsState, setInputsState);
      },
    },
  };

  return (
    <div className={styles["login"]}>
      <SVGTopLoginIcon size={100} color={"#7a7a7a"} />
      {inputsState.map((el, index) => (
        <Input items={el} key={index} callbacks={callbacksInput} />
      ))}
      <Button items={buttonLoginProps} />
    </div>
  );
};
