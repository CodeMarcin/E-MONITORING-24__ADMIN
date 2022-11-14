import { ELoginReducerActionType } from "./Login.enum";

export interface ILoginPasswordActionChangeValue {
  type: ELoginReducerActionType.CHANGE_VALUE;
  value: string;
  name: string;
}


export interface ILoginPasswordActionError {
  type: ELoginReducerActionType.ADD_ERROR | ELoginReducerActionType.REMOVE_ERRROR;
  name: string;
  errorLabel: string;
}


