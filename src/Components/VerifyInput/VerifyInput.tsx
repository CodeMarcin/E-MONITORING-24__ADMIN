import { VERIFY_INPUT_LABELS } from "./VerifyInputsLabels";
interface ILoginValue {
  login: {
    value: string;
    verify: string[];
  };
  password: {
    value: string;
    verify: string[];
  };
}

export const VerifyInput = (inputValue: ILoginValue, callback?: () => void) => {
  let test;
  for (const [key, value] of Object.entries(inputValue)) {
    value.verify.forEach((el: string) => {
      switch (el) {
        case "IS_EMPTY":
          if (value.value.length === 0) test = VERIFY_INPUT_LABELS.NO_EMPTY;
          break;
        default:
          return "";
      }
    });
  }
  return test;
};
