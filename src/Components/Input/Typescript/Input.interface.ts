import { TInputType } from "./Input.type";

export interface IInputProps {
  props: {
    type: TInputType;
    label: string;
    name?: string;
    value: string;
    minLength?: number;
    maxLength?: number;
    errorList?: string[];
    callbacks: {
      onChangeCallback?: (e: React.FormEvent<HTMLInputElement>) => void;
    };
  };
}

export interface IInputTextNumberPasswordProps extends IInputProps {}

export interface IInputTextArea extends IInputProps {
  step?: number;
}
