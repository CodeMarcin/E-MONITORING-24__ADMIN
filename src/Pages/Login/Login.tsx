import { useReducer, useEffect } from "react";
import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";

import { IInputTextNumberPasswordProps } from "../../Components/Input/InputInterface";
import { IButtonProps } from "../../Components/Button/ButtonInterface";

import { VerifyInput } from "../../Components/VerifyInput/VerifyInput";

import { SVGTopLoginIcon } from "../../Utilities/SVG";

import { LOGIN_LABELS } from "./LoginLabels";
import styles from "./Login.module.css";

enum HandleChangeLoginInputValueActionKind {
  CHANGE_VALUE = "CHANGE_VALUE",
}

interface HandleChangeLoginInputValueStateAction {
  type: HandleChangeLoginInputValueActionKind;
  value: string;
  index: string;
}

interface HandleChangeLoginInputValueState {
  name: string;
  value: string;
  verify: string[];
}

const DEAFULT_LOGIN_INPUTS_VALUE: HandleChangeLoginInputValueState[] = [
  {
    name: "login",
    value: "",
    verify: ["IS_EMPTY"],
  },
  {
    name: "password",
    value: "",
    verify: ["IS_EMPTY"],
  },
];

const handleChangeLoginInputValue = (state: HandleChangeLoginInputValueState[], action: HandleChangeLoginInputValueStateAction) => {
  const { type, value, index } = action;
  const newState = state;
  switch (type) {
    case HandleChangeLoginInputValueActionKind.CHANGE_VALUE:
      //   newState[index as keyof HandleChangeLoginInputValueState] = { ...newState[index as keyof HandleChangeLoginInputValueState], value: value };
      return {
        ...state,
      };
  }
};

export const Login = () => {
  const [loginInputsValue, dispatchLoginInputsValue] = useReducer(handleChangeLoginInputValue, DEAFULT_LOGIN_INPUTS_VALUE);

  useEffect(() => {
    console.log(loginInputsValue);
  }, [loginInputsValue]);

  const loginInputProps: IInputTextNumberPasswordProps = {
    type: "text",
    label: LOGIN_LABELS.LOGIN,
    name: "login",
    canGotErrors: true,
    callbacks: {
      onChangeCallback: (e) =>
        dispatchLoginInputsValue({ type: HandleChangeLoginInputValueActionKind.CHANGE_VALUE, value: e.currentTarget.value, index: e.currentTarget.dataset.index }),
    },
  };

  const passwordInputProps: IInputTextNumberPasswordProps = {
    type: "password",
    label: LOGIN_LABELS.PASSWORD,
    name: "password",
    canGotErrors: true,
    callbacks: {
      onChangeCallback: (e) =>
        dispatchLoginInputsValue({ type: HandleChangeLoginInputValueActionKind.CHANGE_VALUE, value: e.currentTarget.value, index: e.currentTarget.dataset.index }),
    },
  };

  const buttonLoginProps: IButtonProps = {
    type: "BASIC",
    width: "FULL",
    value: LOGIN_LABELS.LOGIN_BUTTON,
    callbacks: {
      onClickCallback: () => {
        // const test = VerifyInput(loginInputsValue);
        console.log(test);
      },
    },
  };

  return (
    <div className={styles["login"]}>
      <SVGTopLoginIcon size={100} color={"#7a7a7a"} />
      <Input props={loginInputProps} />
      <Input props={passwordInputProps} />
      <Button props={buttonLoginProps} />
    </div>
  );
};
