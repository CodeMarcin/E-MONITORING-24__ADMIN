import styles from "./Input.module.css";

export const InputTextNumberPassword = (props: { items: IInputProps; callbacks: IInputCallbacks;}) => {
  const { items, callbacks } = props;
  const { type, label, name, showName, maxLength, minLength, value } = items;
  const { onChangeCallback } = callbacks;

  return (
    <input
      className={styles["inputTextNumberPassword"]}
      maxLength={maxLength}
      minLength={minLength}
      type={type}
      placeholder={!showName ? label : ""}
      name={name}
      value={value}
      onChange={onChangeCallback}
    />
  );
};
