import { USE_VALIDATE_INPUT_LABELS } from "./Labels/useValidateInput.labels";

export const useValidateInputy = (inputs: IInputProps[], setInputs: React.Dispatch<React.SetStateAction<IInputProps[]>>) => {
  const addError = (index: number, errorLabel: string) => {
    setInputs((prevState) => {
      prevState[index].errorList?.push(errorLabel);
      return [...prevState];
    });
  };

  const removeError = (index: number, errorLabel: string) => {
    setInputs((prevState) => {
      prevState[index].errorList = prevState[index].errorList?.filter((el) => el !== errorLabel);
      return [...prevState];
    });
  };

  inputs.forEach((el, index) => {
    el.validateList?.forEach((item) => {
      if (!el.errorList) return;
      switch (item) {
        case "IS_EMPTY":
          if (el.value.length === 0 && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NO_EMPTY) === -1) addError(index, USE_VALIDATE_INPUT_LABELS.NO_EMPTY);
          else if (el.value.length !== 0 && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NO_EMPTY) !== -1) removeError(index, USE_VALIDATE_INPUT_LABELS.NO_EMPTY);
          break;
      }
    });
  });
};
