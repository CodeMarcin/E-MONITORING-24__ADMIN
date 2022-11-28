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

  const validateNipIsValid = () => {
    if (input.value.length !== 0 && (input.value.length !== 13 || !checkNipIsValid()) && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE) === -1)
      addError(USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE);
    else if (input.value.length === 13 && checkNipIsValid() && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE) !== -1)
      removeError(USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE);
  };

  const validaZipCodeValid = () => {
    if (input.value.length !== 0 && (input.value.length !== 6 || !checkZipCodeIsValid()) && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE) === -1)
      addError(USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE);
    else if (input.value.length === 6 && checkZipCodeIsValid() && input.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE) !== -1)
      removeError(USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE);
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

  if (input.validateList) {
    return Promise.all(
      input.validateList?.map(async (el) => {
        if (el === "IS_NIP_EXIST") await checkIsNIPExistInDataBase();
        if (el === "IS_EMPTY") validateIsEmpty();
        if (el === "ZIP_CODE_VALIDATE") validaZipCodeValid();
        if (el === "NIP_VALIDATE") validateNipIsValid();
        return input;
      })
    );
  }
};
