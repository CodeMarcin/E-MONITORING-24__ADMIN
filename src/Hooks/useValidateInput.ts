import { IUseValidateInput } from "./Typescript/useValidateInput.interface";
import { TUseValidateInputCallback, TUseValidateInputErrorFnc } from "./Typescript/useValidateInput.type";
import { EUseValidateInputValidateList } from "./Typescript/useValidateInput.enum";
import { USE_VALIDATE_INPUT_LABELS } from "./Labels/useValidateInput.labels";

export const useValidateInputy = (
  inputsValue: IUseValidateInput[],
  addErrorFnc: TUseValidateInputErrorFnc,
  removeErrorFnc: TUseValidateInputErrorFnc,
  callback?: TUseValidateInputCallback
) => {
  inputsValue.forEach((el, index) => {
    if (!el.validate) return;
    el.validateList?.forEach((item) => {
      switch (item) {
        case EUseValidateInputValidateList.IS_EMPTY:
          if (el.value.length === 0 && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NO_EMPTY) === -1) addErrorFnc(el.name, USE_VALIDATE_INPUT_LABELS.NO_EMPTY);
          else if (el.value.length !== 0 && el.errorList?.indexOf(USE_VALIDATE_INPUT_LABELS.NO_EMPTY) !== -1) removeErrorFnc(el.name, USE_VALIDATE_INPUT_LABELS.NO_EMPTY);
          break;
      }
    });
  });
};
