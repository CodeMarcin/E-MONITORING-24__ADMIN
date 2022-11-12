export interface IInputProps {
  type: "text" | "number" | "password" | "textarea";
  label: string;
  name: string;
  canGotErrors?: boolean;
  minLength?: number;
  maxLength?: number;
  callbacks?: {
    onChangeCallback: (e: React.FormEvent<HTMLInputElement>) => void;
  };
}

export interface IInputTextNumberPasswordProps extends IInputProps {}

export interface IInputTextArea extends IInputProps {
  step?: number;
}
