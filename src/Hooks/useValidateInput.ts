import { findContractorByNIPAPI } from "../Api/Contractors";

import { USE_VALIDATE_INPUT_LABELS } from "./Labels/useValidateInput.labels";

export const useValidateInputs = async (stateInput: IInputProps) => {
  const input = stateInput;

  const addError = (errorLabel: string) => {
    input.errorList?.push(errorLabel);
  };

  const removeError = (errorLabel: string) => {
    input.errorList = input.errorList?.filter((el) => el !== errorLabel);
  };

  const validateIsEmpty = () => {
    if (input.value.length === 0 && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NO_EMPTY) === -1) addError(USE_VALIDATE_INPUT_LABELS.NO_EMPTY);
    else if (input.value.length !== 0 && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NO_EMPTY) !== -1) removeError(USE_VALIDATE_INPUT_LABELS.NO_EMPTY);
  };

  const validateIsNumeric = () => {
    if (input.value.length !== 0 && !checkIsNumericValid() && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.IS_NUMERIC) === -1)
      addError(USE_VALIDATE_INPUT_LABELS.IS_NUMERIC);
    else if (input.value.length !== 0 && checkIsNumericValid() && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.IS_NUMERIC) !== -1)
      removeError(USE_VALIDATE_INPUT_LABELS.IS_NUMERIC);
    else if (input.value.length === 0 && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.IS_NUMERIC) !== -1) removeError(USE_VALIDATE_INPUT_LABELS.IS_NUMERIC);
  };

  const validateNipIsValid = () => {
    if (input.value.length !== 0 && (input.value.length !== 13 || !checkNipIsValid()) && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE) === -1)
      addError(USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE);
    else if (input.value.length === 13 && checkNipIsValid() && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE) !== -1)
      removeError(USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE);
  };

  const validateZipCodeValid = () => {
    if (input.value.length !== 0 && (input.value.length !== 6 || !checkZipCodeIsValid()) && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE) === -1)
      addError(USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE);
    else if (input.value.length === 6 && checkZipCodeIsValid() && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE) !== -1)
      removeError(USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE);
  };

  const validateEmailAdressValid = () => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.value.length !== 0 && !input.value.match(mailformat) && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.EMAIL_VALIDATE) === -1)
      addError(USE_VALIDATE_INPUT_LABELS.EMAIL_VALIDATE);
    else if (input.value.length !== 0 && input.value.match(mailformat) && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.EMAIL_VALIDATE) !== -1)
      removeError(USE_VALIDATE_INPUT_LABELS.EMAIL_VALIDATE);
    else if (input.value.length === 0 && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.EMAIL_VALIDATE) !== -1) removeError(USE_VALIDATE_INPUT_LABELS.EMAIL_VALIDATE);
  };

  const validateAccountNumberValid = () => {
    if (
      input.value.length !== 0 &&
      (input.value.length !== 32 || !checkAccountNumberIsValid()) &&
      input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.ACCOUNT_NUMBER_VALIDATE) === -1
    )
      addError(USE_VALIDATE_INPUT_LABELS.ACCOUNT_NUMBER_VALIDATE);
    else if (input.value.length === 32 && checkAccountNumberIsValid() && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.ACCOUNT_NUMBER_VALIDATE) !== -1)
      removeError(USE_VALIDATE_INPUT_LABELS.ACCOUNT_NUMBER_VALIDATE);
  };

  const checkAccountNumberIsValid = () => {
    let validation = true;
    for (let i = 0; i < input.value.length; i++) {
      if (i === 2 || i === 7 || i === 12 || i === 17 || i === 22 || i === 27) validation = input.value[i] === " ";
      else if (input.value[i] === "0") validation = true;
      else validation = !!parseInt(input.value[i]);
      if (!validation) return validation;
    }
    return validation;
  };

  const checkNipIsValid = () => {
    let validation = true;
    for (let i = 0; i < input.value.length; i++) {
      if (i === 3 || i === 7 || i === 10) validation = input.value[i] === "-";
      else if (input.value[i] === "0") validation = true;
      else validation = !!parseInt(input.value[i]);
      if (!validation) return validation;
    }
    return validation;
  };

  const checkZipCodeIsValid = () => {
    let validation = true;
    for (let i = 0; i < input.value.length; i++) {
      if (i === 2) validation = input.value[i] === "-";
      else if (input.value[i] === "0") validation = true;
      else validation = !!parseInt(input.value[i]);
      if (!validation) return validation;
    }
    return validation;
  };

  const checkIsNIPExistInDataBase = async () => {
    if (input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NIP_EXIST) !== -1) removeError(USE_VALIDATE_INPUT_LABELS.NIP_EXIST);
    if (input.value.length !== 0 && checkNipIsValid()) {
      if (input.value === input.originalValue) return;
      const isContractorsFromAPI = (await findContractorByNIPAPI(input.value, 1)).data.length !== 0;
      if (input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NIP_EXIST) === -1 && isContractorsFromAPI) addError(USE_VALIDATE_INPUT_LABELS.NIP_EXIST);
      else if (input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NIP_EXIST) !== -1 && !isContractorsFromAPI) removeError(USE_VALIDATE_INPUT_LABELS.NIP_EXIST);
    }
  };

  const checkIsNumericValid = () => {
    let validation = true;
    for (let i = 0; i < input.value.length; i++) {
      if (input.value[i] === "0") validation = true;
      else validation = !!parseInt(input.value[i]);
      if (!validation) return validation;
    }
    return validation;
  };

  if (input.validateList) {
    return Promise.all(
      input.validateList?.map(async (el) => {
        if (el === "IS_NIP_EXIST") await checkIsNIPExistInDataBase();
        if (el === "IS_EMPTY") validateIsEmpty();
        if (el === "IS_NUMERIC") validateIsNumeric();
        if (el === "ZIP_CODE_VALIDATE") validateZipCodeValid();
        if (el === "NIP_VALIDATE") validateNipIsValid();
        if (el === "EMAIL_VALIDATE") validateEmailAdressValid();
        if (el === "ACCOUNT_NUMBER_VALIDATE") validateAccountNumberValid();

        return input;
      })
    );
  }
};
