import { EUseValidateInputValidateList } from "./useValidateInput.enum";

export interface IUseValidateInput {
  name: string;
  value: string;
  validate: boolean;
  validateList?: EUseValidateInputValidateList[];
  errorList: string[];
}

