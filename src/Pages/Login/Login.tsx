/* eslint-disable react-hooks/rules-of-hooks */
import { useReducer } from "react";

import { Input } from "../../Components/Input/Input";
import { Button } from "../../Components/Button/Button";

import { ILoginPasswordActionChangeValue, ILoginPasswordActionError } from "./Typescript/Login.interface";
import { ELoginReducerActionType, EInputsName } from "./Typescript/Login.enum";

import { TInputSubCategory } from "../../Components/Input/Typescript/Input.type";

import { IUseValidateInput } from "../../Hooks/Typescript/useValidateInput.interface";
import { EUseValidateInputValidateList } from "../../Hooks/Typescript/useValidateInput.enum";

import { useValidateInputy } from "../../Hooks/useValidateInput";

import { SVGTopLoginIcon } from "../../Utilities/SVG";

import { LOGIN_LABELS } from "./Login.labels";

import styles from "./Login.module.css";

const DEAFULT_LOGIN_INPUTS_VALUE: IUseValidateInput[] = [
  {
    name: EInputsName.LOGIN,
    value: "",
    validate: true,
    validateList: [EUseValidateInputValidateList.IS_EMPTY],
    errorList: [],
  },
  {
    name: EInputsName.PASSWORD,
    value: "",
    validate: true,
    validateList: [EUseValidateInputValidateList.IS_EMPTY],
    errorList: [],
  },
];

const handleChangeLoginInputValue = (state: typeof DEAFULT_LOGIN_INPUTS_VALUE, action: ILoginPasswordActionChangeValue | ILoginPasswordActionError) => {
  const { type, name } = action;
  const index = state.findIndex((el) => el.name === name);
  switch (type) {
    case ELoginReducerActionType.CHANGE_VALUE:
      state[index].value = action.value;
      return [...state];
    case ELoginReducerActionType.ADD_ERROR:
      state[index].errorList?.push(action.errorLabel);
      return [...state];
    case ELoginReducerActionType.REMOVE_ERRROR:
      state[index].errorList?.splice(state[index].errorList.indexOf(action.errorLabel), 1);
      return [...state];
  }
};

export const Login = () => {
  const [loginInputsValue, dispatchLoginInputsValue] = useReducer(handleChangeLoginInputValue, DEAFULT_LOGIN_INPUTS_VALUE);

  const INPUTS: TInputSubCategory[] = [
    {
      props: {
        type: "text",
        label: LOGIN_LABELS.LOGIN,
        name: EInputsName.LOGIN,
        value: loginInputsValue[loginInputsValue.findIndex((el) => el.name === EInputsName.LOGIN)].value,
        errorList: loginInputsValue[loginInputsValue.findIndex((el) => el.name === EInputsName.LOGIN)].errorList,
        callbacks: {
          onChangeCallback: (e) => dispatchLoginInputsValue({ type: ELoginReducerActionType.CHANGE_VALUE, value: e.currentTarget.value, name: e.currentTarget.name }),
        },
      },
    },
    {
      props: {
        type: "password",
        label: LOGIN_LABELS.PASSWORD,
        name: EInputsName.PASSWORD,
        value: loginInputsValue[loginInputsValue.findIndex((el) => el.name === EInputsName.PASSWORD)].value,
        errorList: loginInputsValue[loginInputsValue.findIndex((el) => el.name === EInputsName.PASSWORD)].errorList,
        callbacks: {
          onChangeCallback: (e) => dispatchLoginInputsValue({ type: ELoginReducerActionType.CHANGE_VALUE, value: e.currentTarget.value, name: e.currentTarget.name }),
        },
      },
    },
  ];

  const buttonLoginProps: IButtonProps = {
    type: "BASIC",
    width: "FULL",
    value: LOGIN_LABELS.LOGIN_BUTTON,
    callbacks: {
      onClickCallback: () => {
        useValidateInputy(
          loginInputsValue,
          (name, errorLabel) => {
            dispatchLoginInputsValue({ type: ELoginReducerActionType.ADD_ERROR, name, errorLabel });
          },
          (name, errorLabel) => {
            dispatchLoginInputsValue({ type: ELoginReducerActionType.REMOVE_ERRROR, name, errorLabel });
          }
        );
      },
    },
  };

  return (
    <div className={styles["login"]}>
      <SVGTopLoginIcon size={100} color={"#7a7a7a"} />
      {INPUTS.map((el, index) => (
        <Input props={el.props} key={index} />
      ))}
      <Button items={buttonLoginProps} />
    </div>
  );
};
