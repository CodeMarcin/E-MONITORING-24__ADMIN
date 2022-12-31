import styles from "./Input.module.css";

export const InputTextNumberPassword = (props: { items: IInputProps; callbacks: IInputCallbacks }) => {
  const { items, callbacks } = props;
  const { type, label, name, showName, maxLength, minLength, value, step } = items;
  const { onChangeCallback } = callbacks;

  return (
    <>
      {showName && `${label}:`}
      {(type === "text" || type === "password" || type === "number") && (
        <input
          className={styles["inputTextNumberPassword"]}
          maxLength={maxLength}
          minLength={minLength}
          type={type}
          placeholder={!showName ? label : ""}
          name={name}
          value={value}
          step={step}
          onChange={(e: React.FormEvent<HTMLInputElement>) => onChangeCallback(e)}
        />
      )}
    </>
  );
};
