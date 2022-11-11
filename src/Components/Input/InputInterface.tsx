export interface IInputProps {
  type: "text" | "number" | "password" | "textarea";
  label: string;
  canGotErrors?: boolean;
  minLength?: number;
  maxLength?: number;
}

export interface IInputTextNumberPasswordProps extends IInputProps {}

export interface IInputTextArea extends IInputProps {
  step?: number
}
