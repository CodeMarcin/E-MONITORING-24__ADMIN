import { findContractorByNIP } from "../Api/Contractors";

import { USE_VALIDATE_INPUT_LABELS } from "./Labels/useValidateInput.labels";

export const useValidateInputs = async (
  inputs: IInputProps[],
  setInputs: React.Dispatch<React.SetStateAction<IInputProps[]>>,
  setApiLoaderStatus?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // const inputs = inputss.slice();
  const addError = (index: number, errorLabel: string) => {
    // inputs[index].errorList?.push(errorLabel);
    setInputs((prevState) => {
      prevState[index].errorList = [];
      prevState[index].errorList?.push(errorLabel);
      return [...prevState];
    });
  };

  const removeError = (index: number, errorLabel: string) => {
    // inputs[index].errorList = inputs[index].errorList?.filter((el) => el !== errorLabel);
    setInputs((prevState) => {
      prevState[index].errorList = prevState[index].errorList?.filter((el) => el !== errorLabel);
      return [...prevState];
    });
  };

  const validateIsEmpty = (el: IInputProps, index: number) => {
    if (el.value.length === 0 && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NO_EMPTY) === -1) addError(index, USE_VALIDATE_INPUT_LABELS.NO_EMPTY);
    else if (el.value.length !== 0 && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NO_EMPTY) !== -1) removeError(index, USE_VALIDATE_INPUT_LABELS.NO_EMPTY);
  };

  const validateNipIsValid = (el: IInputProps, index: number) => {
    if (el.value.length !== 0 && (el.value.length !== 13 || !checkNipIsValid(el.value)) && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE) === -1)
      addError(index, USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE);
    else if (el.value.length === 13 && checkNipIsValid(el.value) && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE) !== -1)
      removeError(index, USE_VALIDATE_INPUT_LABELS.NIP_VALIDATE);
  };

  const validaZipCodeValid = (el: IInputProps, index: number) => {
    if (el.value.length !== 0 && (el.value.length !== 6 || !checkZipCodeIsValid(el.value)) && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE) === -1)
      addError(index, USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE);
    else if (el.value.length === 6 && checkZipCodeIsValid(el.value) && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE) !== -1)
      removeError(index, USE_VALIDATE_INPUT_LABELS.ZIP_CODE_VALIDATE);
  };

  const checkNipIsValid = (nipValue: string) => {
    let validation = true;
    for (let i = 0; i < nipValue.length; i++) {
      if (i === 3 || i === 7 || i === 10) validation = nipValue[i] !== "-";
      else validation = !!parseInt(nipValue[i]);
    }
    return validation;
  };

  const checkZipCodeIsValid = (zipCode: string) => {
    let validation = true;
    for (let i = 0; i < zipCode.length; i++) {
      if (i === 2) validation = zipCode[i] !== "-";
      else validation = !!parseInt(zipCode[i]);
    }
    return validation;
  };

  const checkIsNIPExistInDataBase = async (el: IInputProps, index: number) => {
    try {
      const data = await findContractorByNIP(el.value, 1);
      const test = !!JSON.parse(data.request.response).length;
      console.log(test, "DATA");
      if (el.value.length !== 0 && checkNipIsValid(el.value) && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NIP_EXIST) === -1 && test)
        addError(index, USE_VALIDATE_INPUT_LABELS.NIP_EXIST);
      else if (el.value.length !== 0 && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NIP_EXIST) !== -1 && !test)
        removeError(index, USE_VALIDATE_INPUT_LABELS.NIP_EXIST);
    } catch (error) {
      console.error(error);
    }
  };

  // const test = [{ e: ["332-212-32-34"] }, { e: ["332-212-32-32"] }];

  // const ass = test.map(
  //   async (el) =>
  //     await Promise.all(
  //       el.e.map(async (item) => {
  //         return findContractorByNIP(item, 1);
  //         // return console.log("test");
  //       })
  //     )
  // );

  // const ass = await new Promise((resolveOuters) => {
  //   resolveOuters(test.map(async (el) => await Promise.all(el.e.map(async (item) => await checkIsNIPExistInDataBase(item)))));
  // });
  // console.log(ass, "ASSS");
  // return ass;

  return Promise.all(
    inputs.map(async (el, index) => {
      if (!el.validateList) return;

      if (el.validateList.some((el) => el === "IS_EMPTY")) validateIsEmpty(el, index);

      if (el.validateList.some((el) => el === "NIP_VALIDATE")) validateNipIsValid(el, index);

      if (el.validateList.some((el) => el === "ZIP_CODE_VALIDATE")) validaZipCodeValid(el, index);

      if (el.validateList.some((el) => el === "IS_NIP_EXIST")) checkIsNIPExistInDataBase(el, index);
    })
  );

  // console.log(await checkInputs(), "CHECK INPUTs");
  // console.log("nie powinno tego byc");
};
