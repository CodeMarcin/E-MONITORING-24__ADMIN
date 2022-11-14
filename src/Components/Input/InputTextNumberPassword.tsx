import { IInputTextNumberPasswordProps } from "./Typescript/Input.interface";

import styles from "./Input.module.css";

export const InputTextNumberPassword = ({ props }: IInputTextNumberPasswordProps) => {
  const { type, label, name, maxLength, minLength, callbacks, value } = props;
  const { onChangeCallback } = callbacks;

  return (
    <input
      className={styles["inputTextNumberPassword"]}
      maxLength={maxLength}
      minLength={minLength}
      type={type}
      placeholder={label}
      name={name}
      value={value}
      onChange={onChangeCallback}
    />
  );
};
